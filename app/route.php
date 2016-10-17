<?php

use Phroute\Phroute\RouteCollector;

$router = new RouteCollector();

$router->any('/', function(){
    return 'This route responds to any method (POST, GET, DELETE etc...) at the URI /example';
});