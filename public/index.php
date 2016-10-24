<?php

require_once '../app/init.php';

require '../vendor/autoload.php';
require '../vendor/illuminate/support/helpers.php';

//$app = new App;

$basePath = str_finish($_SERVER['DOCUMENT_ROOT'], '/goodgaming/');
$controllersDirectory = $basePath . 'app/controllers';
$modelsDirectory = $basePath . 'app/models';


// register the autoloader and add directories
Illuminate\Support\ClassLoader::register();
Illuminate\Support\ClassLoader::addDirectories(array($controllersDirectory, $modelsDirectory));

// Instantiate the container
$app = new Illuminate\Container\Container();

// Tell facade about the application instance
Illuminate\Support\Facades\Facade::setFacadeApplication($app);

// register application instance with container
$app['app'] = $app;

// set environment
$app['env'] = 'production';

with(new Illuminate\Events\EventServiceProvider($app))->register();
with(new Illuminate\Routing\RoutingServiceProvider($app))->register();

require '../routes.php';

// Instantiate the request
$request = Illuminate\Http\Request::createFromGlobals();

// Dispatch the router
$response = $app['router']->dispatch($request);

// Send the response
$response->send();
