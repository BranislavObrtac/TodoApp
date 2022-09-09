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
            return $this->json([
                "todo" => $todo->toArray(),
            ]);
        } catch (Exception $exception) {
            error_log($exception);
        }
    }

    #[Route('/delete/{id}', name: '/api/todo/delete', methods: "DELETE")]
    public function delete(Todo $todo)
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            error_log($exception);
        }
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
