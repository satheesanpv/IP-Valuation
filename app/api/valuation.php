<?php
chdir(dirname(__DIR__));

require_once('vendor/JWT/JWT.php');
require_once('lib/Request.php');
require_once('config/Config.php');
require_once('lib/DbUtils.php');

use IP\DbUtils as DB;

$db = new DB();

use IP\Request as Request;

$pr = [110, 105, 105, 105];
$g = [100.01, 100.01, 100.01, 100.01];

function costMethod($data)
{
    global $pr, $g;
    
    $data->t = $data->t > 0 ? $data->t : 1;
    $data->op = $data->op > 0 ? $data->op : 1;
    $data->d = $data->d > 0 ? $data->d : 10;
    
    
    $ip = ((($data->fxa*$data->d/100)+$data->ifc+((($data->oc+$data->s)/12)*($data->t))+$data->oh)/($data->op))*(1+($data->p/100));
    
    addResult('Cost Method', $ip);
    
    return $ip;
        
}

function royaltyMethod($data)
{
    global $pr, $g;
    
    $data->yr = $data->yr > 0 ? $data->yr : 4;
    $ip = 0;
    
    $r = $data->r*($data->g/100);
    
    for ($i = 0; $i< $data->yr; $i++) {
        
        $pbd = $r* ($data->ry/100);
        $pad = $pbd * (1-(($data->adc+$data->it)/100));
        //$pad = $pbd(1-($data->adc+$data->it)/100);
        $npv = $pad/pow((1+($data->dr/100)), $i+1);
        error_log($npv);
        $ip += $npv;
        
        $r= $r*(105/100);
        $r=$r*(100.01/100);

         
    }
    
    addResult('Royalty Method', $ip);
    return $ip;
}

function marketMethod($data)
{
    global $pr, $g;
    
    $data->yr = $data->yr > 0 ? $data->yr : 4;
    $ip = 0;
    $r= $data->rm * ($data->pr/100);
    $r = $data->rm * ($data->g/100);
    
    for ($i = 0; $i< $data->yr; $i++) {
        error_log($i);
        
        $pbd = $r* ($data->p/100);
        $pad = $pbd * (1-(($data->adc+$data->it)/100));
        //$pad = $pbd - ($data->adc+$data->it);
        $npv = $pad/pow((1+($data->dr/100)), $i+1);
        $ip += $npv;
        
        $r= $r*(105/100);
        $r=$r*(100.01/100);

    }
    
    addResult('Market Method', $ip);
    return $ip;
}


function profitSplitMethod($data)
{
    global $pr, $g;
    
    $data->yr = $data->yr > 0 ? $data->yr : 4;
    $ip = 0;
    $psh = 25;
    $r = $data->r * ($data->g/100);
    
    for ($i = 0; $i< $data->yr; $i++) {
        
        $ope = $r* ($data->opx/100);
        $ifc = $r* ($data->ifx/100);
        
        
        $tp=$r-($ope+$ifc);
        $pex =$tp*(25/100);
        
        error_log($pex);
        $ip += $pex;
        
        $r= $r*(105/100);
        $r=$r*(100.01/100);

    }
    
    addResult('Profit Split Method', $ip);
    return $ip;
}

function addResult($method, $ip) 
{
    global $output;
    
    $result  = array();
    $result['method'] = $method;
    $result['value'] = $ip;
    
    $output->results[] = $result;
    $output->valuation = $ip;
}

function calculateAllValue() {
    global $output;
    
    $count = 0;
    $ip = 0;
    
    foreach ($output->results as $result){
        $count++;
        $ip += $result['value'];    
    }
    
    $ip = $ip/$count;
    
    addResult('All', $ip);
}
$request = new Request();


$request->setAccessHeader();
if ($request->handleOptions()) {
    error_log('Option request. Exit...', 0);
    exit;
}

if (!$request->validate()) {
    error_log('Validation failed. Not authorized!!');
    exit;
}

$input = $request->getJSON();
$output  = $input;
$output->results  = [];

if ($input->valuationMethod === 'Cost Method') {
    costMethod($input);
}

if ($input->valuationMethod === 'Royalty Method') {
    royaltyMethod($input);
}

if ($input->valuationMethod === 'Profit Split Method') {
    profitSplitMethod($input);
}

if ($input->valuationMethod === 'Market Method') {
    marketMethod($input);
}

if ($input->valuationMethod === 'All') {
    costMethod($input);
    royaltyMethod($input);
    profitSplitMethod($input);
    marketMethod($input);
    calculateAllValue();
}

if ($input->idvaluation === null) {
    $output->idvaluation = $db->insertValuation($output);  
} else {
    $db->updateValuation($output);  
}
  
//$output->valuation = '1000020';
error_log(json_encode($output));
header('Content-type: application/json');
echo json_encode($output);