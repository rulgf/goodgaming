<?php

use Illuminate\Database\Eloquent\Model as Eloquent;
use Illuminate\Http\Request;

class User extends Eloquent{

    protected $fillable = ['name', 'email', 'password'];

    public static function store($request, $password){
        $user = new User();
        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->password = $password;
        if($user->save()){
            return $user;
        }
        return true;
    }

    public function reviews(){
        return $this->hasMany('Reviews');
    }

    public function upvotes(){
        return $this->hasMany('User');
    }
}