<?php

use Respect\Validation\Validator as v;
use Respect\Validation\Exceptions\NestedValidationException;

use Illuminate\Http\Request;

include_once ($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/User.php');

session_start();

class userController extends Illuminate\Routing\Controller{

    public function login(){
        $request =$_POST;

        $user = User::where('email', $request['email'])->where('password', hash('sha256',$request['password']))->get()->first();

        if($user){
            //Existe el usuario empieza la sesion
            $_SESSION['USER']= $user->name;
            return json_encode(array(
                'success' => true
            ));
        }else{
            //no eexiste el usuario regresar error
            return json_encode(array(
                'error' => array(
                    'msg' => 'The email or the password don\'t match',
                    'code' => '200',
                ),
            ));
        }

    }

    public function signup(){
        $request =$_POST;

        $emailVal = v::email()->validate($request['email']);
        $passVal = v::stringType()->length(6, 20)->validate($request['password']);
        $nameVal = v::stringType()->length(6, 20)->validate($request['name']);

        if($emailVal){
            if($nameVal){
                if($passVal){
                    if($_POST['password'] == $_POST['confirmpass']){
                        $password = hash('sha256', $request['password']);

                        $user = User::store($request, $password);

                        if($user){
                            //Lo almacene bien inciar sesion
                            $_SESSION['USER']= $user->name;
                            return json_encode(array(
                                'success' => true
                            ));
                        }else{
                            //No se guardo
                            return json_encode(array(
                                'error' => array(
                                    'msg' => 'The user cannot be saved',
                                    'code' => '200',
                                ),
                            ));
                        }
                    }else{
                        return json_encode(array(
                            'error' => array(
                                'msg' => 'The password dont match',
                                'code' => '200',
                            ),
                        ));
                    }
                }else{
                    return json_encode(array(
                        'error' => array(
                            'msg' => 'The password must be between 6 and 20 characters',
                            'code' => '200',
                        ),
                    ));
                }
            }else{
                return json_encode(array(
                    'error' => array(
                        'msg' => 'the username must be between 6 and 20 characters',
                        'code' => '200',
                    ),
                ));
            }
        }else{
            return json_encode(array(
                'error' => array(
                    'msg' => 'The email is not valid',
                    'code' => '200',
                ),
            ));
        }
    }

    public function signout(){
        session_destroy();
        return json_encode(array(
            'success' => true
        ));
    }

    public function getUser()
    {
        //Valido la sesion
        if(isset($_SESSION['USER'])){
            return json_encode(array(
                'user' => array(
                    'name' => $_SESSION['USER'],
                    'code' => '200',
                ),
            ));
        }else{
            return json_encode(array(
                'error' => array(
                    'msg' => 'No session available',
                    'code' => '200',
                ),
            ));
        }
    }
}