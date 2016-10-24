<?php

use Respect\Validation\Validator as v;

use Illuminate\Http\Request;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Reviews.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/User.php');


session_start();

class gamesController extends Illuminate\Routing\Controller{

    //Obtengo todos los ultimos juegos
    public function getLastGames(){
        $lastgames = Games::get();

        return $lastgames;
    }

    public function getAllGames(){
        $allgames = Games::with('platforms')->with('avgRating')->get();

        return $allgames;
    }

    public function getGame($id){
        $game = Games::where('id', $id)->with('platforms')->with('avgRating')->get()->first();

        return $game;
    }

    public function getGameReviews($id){
        $reviews= Reviews::where('game_id', $id)->with('countUpvotes')->with('countDownvotes')->get();

        return $reviews;
    }

    public function getUserReview($id){
        /*if(isset($_SESSION['USER'])){
            $username = $_SESSION['USER'];
            $user=User::where('name', $username)->get()->first();

            $reviews= Reviews::where('user_id', $user->id)->where('game_id', $id)->with('countUpvotes')->with('countDownvotes')->get();
            return $reviews;
        }else{
            return response()->json(['success' => false, 'errors' => ['The user has no review']]);
        }*/
            $username = 'rul';
            $user=User::where('name', $username)->get()->first();

            $review= Reviews::where('user_id', $user->id)->where('game_id', $id)->with('countUpvotes')->with('countDownvotes')->get()->first();

            if($review){
                return $review;
            }
            else{
                return json_encode(array(
                    'error' => array(
                        'msg' => 'no review for the user',
                        'code' => '200',
                    ),
                ));
            }
    }
}