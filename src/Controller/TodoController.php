<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
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

        $todo = new Todo();

        $todo->setName($content->name);

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
            'message' => ['text' => ['To-Do has been created !', 'Task: ' . $content->name], 'level' => 'success']
        ]);
    }

    #[Route('/delete/{id}', name: '/api/todo/delete')]
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            error_log($exception);
        }

        return $this->json([
            "message" => "todo has been deleted"
        ]);
    }

    #[Route('/update/{id}', name: '/api/todo/update/', methods: "PUT")]
    public function update(Request $request, Todo $todo)
    {
        $content = json_decode($request->getContent());

        $todo->setName(($content->name));

        try {
            $this->entityManager->flush();
        } catch (Exception $exception) {
            error_log($exception);
        }

        return $this->json([
            "message" => "todo has been updated"
        ]);
    }
}
