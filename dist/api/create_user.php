<?php
//chdir(dirname(__DIR__));

require_once('vendor/JWT/JWT.php');
require_once('lib/Request.php');
require_once('config/Config.php');
require_once('lib/sendMail.php');
require_once('lib/DbUtils.php');



use IP\Request as Request;
use IP\DbUtils as DB;
use IP\sendMail as sendMail;

$db = new DB();

$request = new Request();


error_log($request->getMethod());



$request->setAccessHeader();
if ($request->handleOptions()) {
    error_log('Option request. Exit...', 0);
    exit;
}

$user = $request->getJSON();

if (!$request->validate('Admin')) {
    $user->status = 'Pending';
} else {
    $user->status = 'Approved';
}

if (!$user->username || !$user->email || !$user->name || !$user->institute) {
    $message = "FAILED: Missing required fields!!";
} else {
    $message = $db->createUser($user);    
}

$output->message = $message;

if ($message === 'SUCCESS') {
    
    if ($user->status == 'Pending') {
        $mail = new sendMail;

        $toList = $db->getUser(null, null, 'Admin');
    
        //echo json_encode($toList);
        $subject = 'Pending Approval User: '.$user->username;
        $body = "<table>";
    
        foreach ($user as $key => $row) {
        
            if (preg_match('/password/i', $key)) {
                continue;
            }
            
            $body .= "<tr>";
            $body .= "<td>$key</td><td>$row</td>";
            $body .= "</tr>";
        }    
        $body .= "</table>";
        
        $approveURL = $_SERVER["HTTP_REFERER"]."#/userList";
        
        $link = '<a href="'.$approveURL.'" style="font-size:16px; font-weight: bold; font-family: Helvetica, Arial, sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block"><span style="background-color: blue;color: white;margin: 2px;padding: 5px;border-radius: 15px;">Approve</span></a>';
        
        $body .=  $link;
        
        $mail->sendMail($toList, $subject, $body);
        
    }
    
    $user = $db->getUser($user->username);
    $output->user = $user;
}

header('HTTP/1.0 200 Success');
header('Content-type: application/json');
echo json_encode($output);