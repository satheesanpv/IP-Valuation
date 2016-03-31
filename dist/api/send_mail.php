<?php
require_once('config/Config.php');
require_once('lib/sendMail.php');

use IP\sendMail as sendMail;

$mail = new sendMail;

$toList = [
            ['email'=> 'sathpv@corp.untd.com', 
             'name' => 'satheesan'
            ],[
                'email' => 'satheesan@gmail.com', 
                'name' => 'satheesan'
            ]];
echo json_encode($toList);
$mail->sendMail($toList, 'Testing', 'This is a testmail');