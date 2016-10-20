<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Respect\Validation\Validator as v;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Reviews.php');

class gamesController extends Controller{

    //Obtengo todos los ultimos juegos
    public function getLastGames(){
        $lastgames = Games::get();

        return $lastgames;
    }

    public function getAllGames(){
        $allgames = Games::with('platforms')->with('avgRating')->get();

        return $allgames;
    }

    public function getGame(ServerRequestInterface $request, $id){
        //$game = Games::where('id', $id)->with('platforms')->with('avgRating')->get();

        return $id;
    }

    /*public function getGameReviews($id){
        $reviews= Reviews::where('game_id', $id)->with('upvotes')->get();
        return $reviews;
    }*/
}