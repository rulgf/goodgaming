<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

class Platform extends Eloquent{
    protected $table = 'platforms';

    public function games(){
        return $this->belongsToMany('Games','games_platforms','platform_id','games_id');
    }
}