<?php

use Illuminate\Database\Eloquent\Model as Eloquent;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Lists.php');

class Gender extends Eloquent{
    protected $table = 'genders';

    public function games(){
        return $this->belongsToMany('Games','games_genders','gender_id','game_id');
    }

    public function lists(){
        return $this->belongsToMany('Lists','lists_genders','gender_id','list_id');
    }
}