<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

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

/*$route->map('GET', '/', function (ServerRequestInterface $request, ResponseInterface $response) {
    $response->getBody()->write('<h1>Hello, World!</h1>');

    return $response;
});*/

$route->get('/', 'HomeController::index');
//$route->map('GET', '/', [new HomeController(), 'someMethod']);

$response = $route->dispatch($container->get('request'), $container->get('response'));

$container->get('emitter')->emit($response);
