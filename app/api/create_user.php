<?php
chdir(dirname(__DIR__));

require_once('vendor/JWT/JWT.php');
require_once('lib/Request.php');
require_once('config/Config.php');
require_once('lib/DbUtils.php');


use IP\Request as Request;
use IP\DbUtils as DB;

$db = new DB();

$request = new Request();


error_log($request->getMethod());



$request->setAccessHeader();
if ($request->handleOptions()) {
    error_log('Option request. Exit...', 0);
    exit;
}

if (!$request->validate('Admin')) {
    error_log('Validation failed. Not authorized!!');
    exit;
}
$user = $request->getJSON();

$message = $db->createUser($user);    

$output->message = $message;

if ($message === 'SUCCESS') {
    $user = $db->getUser($user->username);
    $output->user = $user;
}

header('Content-type: application/json');
echo json_encode($output);