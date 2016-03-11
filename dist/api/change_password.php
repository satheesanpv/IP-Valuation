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

$request->setAccessHeader();
if ($request->handleOptions()) {
    error_log('Option request. Exit...', 0);
    exit;
}

$user = $request->getJSON();
$username = $user->username;
$password = $user->password;


if (!$request->validate(null, $username)) {
    error_log('Validation failed. Not authorized!!');
    exit;
}

try {
   
    $rs =$db->getUser($username);
    if ($rs) {
        if (password_verify($password, $rs['password'])) {
            
            $user->iduser = $rs['iduser'];
            $message = $db->updatePassword($user);

        } else {
            $message = "Current password do not match!!!";
        }
    } else {
        $message = "User not found!!";
    }
    
    $output = new stdClass();;
    $output->message = $message;
    header('Content-type: application/json');
    echo json_encode($output);
    
} catch (Exception $e) {
    error_log($e, 0);
    header('HTTP/1.0 500 Internal Server Error');
}