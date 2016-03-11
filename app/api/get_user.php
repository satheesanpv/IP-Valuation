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

if (!$request->validate()) {
    error_log('Validation failed. Not authorized!!');
    exit;
}
$id = intval($_GET['id']);

error_log(json_encode($id));
$user = $db->getUser(null, $id);
error_log(json_encode($user));
header('Content-type: application/json');
echo json_encode($user);