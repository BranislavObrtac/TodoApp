<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Form\TodoType;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use SebastianBergmann\Environment\Console;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/todo', name: '/api/todo')]
class TodoController extends AbstractController
{

    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: '/api/todo/read', methods: "GET")]
    public function index()
    {
        $todos = $this->todoRepository->findAll();

        $arrayOfTodos = [];

        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: '/api/todo/create', methods: "POST")]
    public function create(Request $request)
    {
        $content = json_decode($request->getContent());

        $form = $this->createForm(TodoType::class);
        $form->submit((array)$content);

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(deep: true, flatten: true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['text' => implode("\n", $errors), 'level' => 'error']
            ]);
        }


        $todo = new Todo();

        $todo->setTask($content->task);
        $todo->setDescription($content->description);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            error_log($exception);
            return $this->json([
                'message' => ['text' => ['Could not submit To-Do to the database.'], 'level' => 'error']
            ]);
        }

        return $this->json([
            "todo" => $todo->toArray(),
            'message' => ['text' => 'To-Do (' . $todo->getTask() . ') has been created !', 'level' => 'success']
        ]);
    }

    #[Route('/delete/{id}', name: '/api/todo/delete')]
    public function delete(Todo $todo)
    {
        $taskName = $todo->getTask();

        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            error_log($exception);
            return $this->json([
                'message' => ['text' => ['Could not delete To-Do to from the database.'], 'level' => 'error']
            ]);
        }

        return $this->json([
            'message' => ['text' => 'To-Do (' . $taskName . ') has been successfully deleted !', 'level' => 'success']
        ]);
    }

    #[Route('/update/{id}', name: '/api/todo/update/', methods: "PUT")]
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());
        $taskName = $todo->getTask();

        $form = $this->createForm(TodoType::class);
        $nonObject = (array)$content;
        unset($nonObject['id']);


        $form->submit($nonObject);

        if (!$form->isValid()) {
            $errors = [];
            foreach ($form->getErrors(deep: true, flatten: true) as $error) {
                $propertyName = $error->getOrigin()->getName();
                $errors[$propertyName] = $error->getMessage();
            }
            return $this->json([
                'message' => ['text' => implode("\n", $errors), 'level' => 'error']
            ]);
        }

        if ($todo->getTask() === $content->task && $todo->getDescription() === $content->description) {
            return $this->json([
                'message' => ['text' => ['There was no change to tho TO-DO. Neither the name or the description.'], 'level' => 'error']
            ]);
        }

        $todo->setTask(($content->task));
        $todo->setDescription(($content->description));

        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            error_log($exception);
            return $this->json([
                'message' => ['text' => ['Could not update To-Do to the database.'], 'level' => 'error']
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => 'To-Do (' . $taskName . ') has been successfully updated !', 'level' => 'success']
        ]);
    }
}
