<?php
//chdir(dirname(__DIR__));

require_once('vendor/JWT/JWT.php');
require_once('lib/Request.php');
require_once('config/Config.php');
require_once('lib/DbUtils.php');
require_once('lib/sendMail.php');


use IP\DbUtils as DB;
use IP\sendMail as sendMail;


$db = new DB();

use IP\Request as Request;

$request = new Request();


$request->setAccessHeader();
if ($request->handleOptions()) {
    error_log('Option request. Exit...', 0);
    exit;
}

if (!$request->validate('Admin')) {
    error_log('Validation failed. Not authorized!!');
    exit;
}

$input = $request->getJSON();

$userId = $input->userId;

if ($userId > 0)  {
    $user = $db->getUser(null, $userId);
    if (!$user) {
        $result = "No user found with id: ".$userId;
    } else {
        $result =  $db->approveUser($userId);    
        
        if ($result == "SUCCESS") {
            $mail = new sendMail;
            
            //print_r($user);
            $toList = $user['email'];
    
            //echo json_encode($toList);
            $subject = 'Your account is ready to use now!!';
        
            $body = "Admin approved your account. Now you can login and use the exciting features!!!";
            
            $loginURL = $_SERVER["HTTP_REFERER"]."#/login";
        
            $link = '<a href="'.$loginURL.'" style="font-size:16px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block"><span style="background-color: blue;color: white;margin: 2px;padding: 5px;border-radius: 15px;">Login</span></a>';
        
            $body .=  $link;
        
            $mail->sendMail($toList, $subject, $body);
         }
    }
} else {
    $result = "Missing userId!!";
}

  
//$output->valuation = '1000020';
//error_log(json_encode($result));
header('Content-type: application/json');
echo json_encode($result);