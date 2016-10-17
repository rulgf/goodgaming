<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator as v;

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
        $number = 'hola';
        $validator=v::numeric()->validate($number); // true

        /*if($validator){
            return 'pase';
        }else{
            return 'no pase';
        }*/


        $response->getBody()->write('Updated User with ID: ' . $userId);

        return $response->withStatus(202);
    }
}