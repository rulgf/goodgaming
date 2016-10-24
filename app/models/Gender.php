<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');

class Gender extends Eloquent{
    protected $table = 'genders';

    public function games(){
        return $this->belongsToMany('Games','games_genders','gender_id','game_id');
    }
}