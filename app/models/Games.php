<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

class Games extends Eloquent{
    protected $table = 'games';

    public function genders(){
        return $this->belongsToMany('Gender','games_genders', 'game_id', 'gender_id');
    }

    public function platforms(){
        return $this->belongsToMany('Platform','games_platforms', 'game_id', 'platform_id');
    }

    public function reviews(){
        return $this->hasMany('Reviews', 'game_id');
    }

    public function avgRating()
    {
        return $this->reviews()
            ->selectRaw('avg(rate) as aggregate, game_id')
            ->groupBy('game_id');
    }
}