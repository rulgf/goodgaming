<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class HomeController extends Controller{

    public function index($name = ''){
        $user = $this->model('User');
        $user->name = $name;
        $this->view('home/index', ['name' => $user->name]);
    }

    public function create($username = '', $email = ''){
        User::create([
            'name' => $username,
            'email' => $email
        ]);
    }
    public function hola(ServerRequestInterface $request, ResponseInterface $response, array $args){
        $userId = $args['content'];
        $requestBody = json_decode($request->getBody(), true);

        // possibly update a record in the database with the request body

        $response->getBody()->write('Updated User with ID: ' . $userId);

        return $response->withStatus(202);
    }
}