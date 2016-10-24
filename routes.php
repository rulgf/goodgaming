<?php

//Games routes
$app['router']->get('/games', 'gamesController@getLastGames');
$app['router']->get('/allgames', 'gamesController@getAllGames');
$app['router']->get('/game/{id}', 'gamesController@getGame');
$app['router']->get('/gamereviews/{id}', 'gamesController@getGameReviews');
$app['router']->get('/usereview/{id}', 'gamesController@getUserReview');

//Reviews Routes

//Upvotes Routes

//User routes
$app['router']->post('/createuser', 'userController@signup');
$app['router']->post('/login', 'userController@login');
$app['router']->get('/getuser', 'userController@getUser');
$app['router']->get('/logout', 'userController@signout');
