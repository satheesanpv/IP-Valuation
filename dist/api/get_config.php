<?php
chdir(dirname(__DIR__));

require_once('vendor/JWT/JWT.php');
require_once('lib/Request.php');
require_once('config/Config.php');
require_once('lib/DbUtils.php');

use IP\DbUtils as DB;

$db = new DB();

use IP\Request as Request;

$request = new Request();


$request->setAccessHeader();
if ($request->handleOptions()) {
    error_log('Option request. Exit...', 0);
    exit;
}

/*if (!$request->validate()) {
  error_log('Validation failed. Not authorized!!');
    exit;
} */

$input = $request->getJSON();

$name = $input->name?$input->name: $_GET['name'];

$result =  $db->getConfig($name);
  
//$output->valuation = '1000020';
//error_log(json_encode($result));
header('Content-type: application/json');
echo json_encode($result);