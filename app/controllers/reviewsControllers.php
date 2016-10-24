<?php

use Respect\Validation\Validator as v;

use Illuminate\Http\Request;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');
include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Reviews.php');

class reviewsController extends Illuminate\Routing\Controller{
    public function writeReview($id){
        $request = $_REQUEST;

        if(isset($_SESSION['USER'])){
            $username = $_SESSION['USER'];
            $user=User::where('name', $username)->get()->first();

            $rateVal = v::email()->validate($request['email']);

            if($rateVal){
                if($request['title']){
                    if($request['description']){
                        //Save Review
                        $review = Reviews::store($request, $id, $user->id);

                        if($review){
                            return json_encode(array(
                                'success' => true
                            ));
                        }else{
                            //No se guardo
                            return json_encode(array(
                                'error' => array(
                                    'msg' => 'The review cannot be saved',
                                    'code' => '200',
                                ),
                            ));
                        }
                    }else{
                        return json_encode(array(
                            'error' => array(
                                'msg' => 'The description is missing',
                                'code' => '200',
                            ),
                        ));
                    }
                }else{
                    return json_encode(array(
                        'error' => array(
                            'msg' => 'The title is missing',
                            'code' => '200',
                        ),
                    ));
                }
            }else{
                return json_encode(array(
                    'error' => array(
                        'msg' => 'The rate is missing',
                        'code' => '200',
                    ),
                ));
            }
        }else{
            return json_encode(array(
                'error' => array(
                    'msg' => 'No user logged in',
                    'code' => '200',
                ),
            ));
        }
    }

    public function deleteReview($id){
        Reviews::destroy($id);

        return json_encode(array(
            'success' => true
        ));
    }

}