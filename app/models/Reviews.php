<?php

use Illuminate\Database\Eloquent\Model as Eloquent;


class Reviews extends Eloquent{
    protected $table = 'reviews';

    protected $fillable = [
        'game_id', 'rate', 'title', 'description', 'user_id'
    ];

    public static function store($request, $game_id, $user_id){
        $review = new Reviews();
        $review->game_id = $game_id;
        $review->rate = $request['rate'];
        $review->title = $request['title'];
        $review->description = $request['description'];
        $review->user_id= $user_id;
        if($review->save()){
            return $review;
        }
        return true;
    }

    public function upvotes(){
        return $this->hasMany('Upvotes', 'review_id');
    }

    public function user(){
        return $this->belongsTo('User', 'user_id');
    }

    public function game(){
        return $this->belongsTo('Games', 'game_id');
    }

    public function countUpvotes()
    {
        return $this->upvotes()
            ->where('value' , 1)
            ->selectRaw('count(value) as upvotes, review_id')
            ->groupBy('review_id');
    }

    public function countDownvotes()
    {
        return $this->upvotes()
            ->where('value' , 0)
            ->selectRaw('count(value) as downvotes, review_id')
            ->groupBy('review_id');
    }
}