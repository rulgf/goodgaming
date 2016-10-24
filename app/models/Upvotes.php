<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/User.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Reviews.php');

class Upvotes extends Eloquent{
    protected $table = 'upvotes';

    protected $fillable = [
        'user_id', 'review_id', 'value'
    ];

    public static function store($request, $user_id){
        $vote = new Upvotes();
        $vote->user_id = $user_id;
        $vote->review_id = $request['review_id'];
        $vote->value = $request['value'];
        if($vote->save()){
            return $vote;
        }
        return true;
    }

    public function reviews(){
        return $this->belongsTo('Reviews', 'review_id');
    }

    public function users(){
        return $this->belongsTo('User', 'user_id');
    }
}