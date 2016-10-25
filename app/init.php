<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
//Composer autoloader
require_once '../vendor/autoload.php';

require_once 'database.php';

require_once 'core/Controller.php';

include($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Games.php');
include($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Reviews.php');
include($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/User.php');
include($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Upvotes.php');
include($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Gender.php');
include($_SERVER['DOCUMENT_ROOT'] . '/goodgaming/app/models/Platform.php');

