<?php

use Illuminate\Database\Eloquent\Model as Eloquent;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Upvotes.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Lists.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Reviews.php');

class User extends Eloquent{
    public $name;

    protected $fillable = ['name', 'email', 'password'];

    public static function store(ServerRequestInterface $request, $user_id){
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        if($user->save()){
            return $user;
        }
        return true;
    }

    public function lists(){
        return $this->hasMany('Lists');
    }

    public function reviews(){
        return $this->hasMany('Reviews');
    }

    public function upvotes(){
        return $this->hasMany('User');
    }
}