<?php

class HomeController{

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
}