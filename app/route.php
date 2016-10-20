<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

//Requires all controllers files
require_once('controllers/home.php');
require_once('controllers/gamesController.php');

//
//Listen URL's
$container = new League\Container\Container;

$container->share('response', Zend\Diactoros\Response::class);
$container->share('request', function () {
    $_SERVER['REQUEST_URI'] = str_replace('/goodgaming/public', '', $_SERVER['REQUEST_URI']);
    return Zend\Diactoros\ServerRequestFactory::fromGlobals(
        $_SERVER, $_GET, $_POST, $_COOKIE, $_FILES
    );
});

$container->share('emitter', Zend\Diactoros\Response\SapiEmitter::class);

$route = new League\Route\RouteCollection;

$route->setStrategy(new League\Route\Strategy\ParamStrategy);

/*
 * Map of the request
 */
$route->get('/', 'HomeController::hola');

//Games Routes
$route->get('/games', 'gamesController::getLastGames');
$route->get('/allgames', 'gamesController::getAllGames');

$route->get('/game/{id}', 'gamesController::getGame');

$response = $route->dispatch($container->get('request'), $container->get('response'));

$container->get('emitter')->emit($response);