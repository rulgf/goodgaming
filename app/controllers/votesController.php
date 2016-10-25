<?php

use Respect\Validation\Validator as v;

use Illuminate\Http\Request;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Upvotes.php');

session_start();

class votesController extends Illuminate\Routing\Controller{

    public function upvote($review_id){

        $request = $_REQUEST;

        if(isset($_SESSION['USER'])){
            $username = $_SESSION['USER'];
            $user=User::where('name', $username)->get()->first();

            $vote = Upvotes::where('review_id', $review_id)->where('user_id', $user->id)->first();

            if($vote){
                $vote->value = $request['value'];
                $vote->save();

                return json_encode(array(
                    'success' => true
                ));
            }else{
                $vote = Upvotes::store($request, $user->id, $review_id);

                return json_encode(array(
                    'success' => true
                ));
            }
        }else{
            return json_encode(array(
                'error' => array(
                    'msg' => 'You need to be logged in the system',
                    'code' => '200',
                ),
            ));
        }
    }
}