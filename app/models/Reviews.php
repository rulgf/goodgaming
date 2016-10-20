<?php

use Illuminate\Database\Eloquent\Model as Eloquent;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/User.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Upvotes.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');

class Reviews extends Eloquent{
    protected $table = 'reviews';

    protected $fillable = [
        'game_id', 'rate', 'title', 'description'
    ];

    public static function store(ServerRequestInterface $request, $game_id){
        $review = new Reviews();
        $review->game_id = $game_id;
        $review->rate = $request->rate;
        $review->title = $request->title;
        $review->description = $request->description;
        if($review->save()){
            return $review;
        }
        return true;
    }

    public function upvotes(){
        return $this->hasMany('Upvotes');
    }

    public function user(){
        return $this->belongsTo('User', 'user_id');
    }

    public function game(){
        return $this->belongsTo('Games', 'game_id');
    }
}