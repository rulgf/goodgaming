<?php

/*
 * Routes file: Specify which routes the application is listening and execute code
 */

/*
 * Games routes
 */
$app['router']->get('/games', 'gamesController@getLastGames');
$app['router']->get('/allgames', 'gamesController@getAllGames');
$app['router']->get('/game/{id}', 'gamesController@getGame');
$app['router']->get('/gamereviews/{id}', 'gamesController@getGameReviews');
$app['router']->get('/usereview/{id}', 'gamesController@getUserReview');

/*
 * Reviews Routes
 */
$app['router']->post('/writereview/{id}', 'reviewsController@writeReview');
$app['router']->delete('/deletereview/{id}', 'reviewsController@deleteReview');

/*
 * Upvotes Routes
 */
$app['router']->post('/upvote/{id}', 'votesController@upvote');

/*
 * User routes
 */
$app['router']->post('/createuser', 'userController@signup');
$app['router']->post('/login', 'userController@login');
$app['router']->get('/getuser', 'userController@getUser');
$app['router']->get('/logout', 'userController@signout');
