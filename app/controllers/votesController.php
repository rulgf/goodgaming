<?php

use Respect\Validation\Validator as v;

use Illuminate\Http\Request;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Upvotes.php');

class gamesController extends Illuminate\Routing\Controller{

    public function upvote($game_id){

        $request = $_REQUEST;

        if(isset($_SESSION['USER'])){
            $username = $_SESSION['USER'];
            $user=User::where('name', $username)->get()->first();

            $vote = Upvotes::where('game_id', $game_id)->where('user_id', $user->id)->get()->first();

            if($vote){
                $vote->value = $request['value'];
                $vote->save();

                return json_encode(array(
                    'success' => true
                ));
            }else{
                $vote = Upvotes::store($request, $user->id);

                return json_encode(array(
                    'success' => true
                ));
            }
        }else{
            return json_encode(array(
                'error' => array(
                    'msg' => 'Not Logged in',
                    'code' => '200',
                ),
            ));
        }
    }
}