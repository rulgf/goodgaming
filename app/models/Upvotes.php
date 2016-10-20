<?php

use Illuminate\Database\Eloquent\Model as Eloquent;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/User.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Lists.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Reviews.php');

class Upvotes extends Eloquent{
    protected $table = 'upvotes';

    protected $fillable = [
        'user_id', 'review_id', 'list_id', 'value'
    ];

    public static function store(ServerRequestInterface $request, $user_id){
        $review = new Reviews();
        $review->user_id = $user_id;
        $review->review_id = $request->review_id;
        $review->list_id = $request->list_id;
        $review->value = $request->value;
        if($review->save()){
            return $review;
        }
        return true;
    }

    public function lists(){
        return $this->belongsTo('Lists', 'list_id');
    }

    public function reviews(){
        return $this->belongsTo('Reviews', 'review_id');
    }

    public function users(){
        return $this->belongsTo('User', 'user_id');
    }
}