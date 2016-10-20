<?php

use Illuminate\Database\Eloquent\Model as Eloquent;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/User.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Upvotes.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Gender.php');

class Lists extends Eloquent{
    protected $table = 'lists';

    protected $fillable = [
        'user_id', 'name', 'description'
    ];

    //Create a new List
    public static function store(ServerRequestInterface $request, $user_id){
        $list = new Lists();
        $list->user_id = $user_id;
        $list->name = $request->name;
        $list->description = $request->description;
        if($list->save()){
            return $list;
        }
        return true;
    }

    public function user(){
        return $this->belongsTo('User', 'user_id');
    }

    public function upvotes(){
        return $this->hasMany('Upvotes');
    }

    public function games(){
        return $this->belongsToMany('Games', 'lists_games', 'list_id', 'game_id');
    }

    public function genders(){
        return $this->belongsToMany('Gender', 'lists_genders', 'list_id', 'gender_id');
    }

}