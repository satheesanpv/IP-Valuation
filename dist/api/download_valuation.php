<?php
    require 'vendor/PHPExcel-1.8/Classes/PHPExcel.php';
    
    require_once('vendor/JWT/JWT.php');
    require_once('lib/Request.php');
    require_once('config/Config.php');
    require_once('lib/DbUtils.php');

    use IP\DbUtils as DB;

    $db = new DB();

    use IP\Request as Request;

    $request = new Request();

    $keys = array('idvaluation' => 'id',
                  'name' => 'Name',
                  'institute' => 'Institute',
                  'createdDate' => 'Created On',
                  'userName' => 'User Created',
                  'developedBy' => 'Developed By',
                  'contactEmail' => 'Email',
                  'contactMobile' => 'Mobile',
                  'technology' => 'Technology',
                  'techType' => 'Type',
                  'ipCategory' => 'IP Category',
                  'ipState' => 'IP State',
                  'valuationMethod' => 'Method',
                  'valuation' => 'Valuation',
                  'fxa' => 'Fixed costs specific to R&D',
                  'ifc' => 'Incremental Fixed Costs',
                  'ppm' => 'Price/Unit of Compiting Product',
                  'pp' => 'Product Price/Unit',
                  'svm' => 'Units Sold Annualy of Compiting Product',
                  'sv' => 'Sales Volume of Developed Product',
                  'rm' => 'Expected Revenue of Compiting Product',
                  'r' => 'Expected Revenue',
                  'p' => 'Expected Profits (%)',
                  'yr' => 'Expected Life of Technology',
                  'dr' => 'Discount Rate (%)',
                  'adc' => 'Administration Cost (yearly %)',
                  'it' => 'Income Tax (Per year %)',
                  'expectedGrowth' => 'Expected Sales Growth',
                  'g' => 'Growth Rate (%)',
                  'pricingStratagy' => 'Pricing Strategy',
                  'pr' => 'Pricing Factor (%)',
                  'd' => 'Depreciation rate (%)',
                  'oc' => 'R&D Expenses/year',
                  's' => 'Salary',
                  't' => 'Time spent on R&D (in months)',
                  'op' => 'No. of Outputs from R&D',
                  'oh' => 'Overheads (if any)',
                  'ry' => 'Royalty Rate (%)',
                  'opx' => 'Operating Expenses(%)',
                  'ifx' => 'Incremental Fixed Costs(%)',
                  'Cost Method' => 'Cost Method',
                  'Royalty Method' => 'Royalty Method',
                  'Profit Split Method' => 'Profit Split Method',
                  'Market Method' => 'Market Method',
                  'All' => 'All'
    );


    $request->setAccessHeader();
    if ($request->handleOptions()) {
        error_log('Option request. Exit...', 0);
        exit;
    }


    $input = $request->getJSON();

    $token = $input->id?$input->id: $_GET['token'];
    $userId = $input->userId?$input->userId: $_GET['userId'];

    //error_log($token);
    
    $request->setHeader('Authorization', 'Bearer '.$token);

    if (!$request->validate()) {
        echo 'You do not have permision to download this file!!!';
        error_log('Validation failed. Not authorized!!');
        exit;
    }


    $result =  $db->getValuation($id, $userId);
  
    $objPHPExcel = new PHPExcel();
    
    // DEMO ONLY (potentially unsafe)
    
    $objPHPExcel->setActiveSheetIndex(0);
    $activeSheet = $objPHPExcel->getActiveSheet();
    

    //$objPHPExcel->getActiveSheet()->SetCellValue('A1', 'Hello');
    //$objPHPExcel->getActiveSheet()->SetCellValue('B2', 'world!');
    //$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Hello');
    //$objPHPExcel->getActiveSheet()->SetCellValue('D2', 'world!');

    // Rename sheet
    //echo date('H:i:s') . " Rename sheet\n";
    $objPHPExcel->getActiveSheet()->setTitle('data');

    
    
    // prepare header row
    $j=0;
    foreach ($keys as $key => $val) {
        //echo $j ." ".$val."<br>";
        $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j++, 1, $val);
    }
    

    // prepare the rest
    $i=2;
    foreach ($result as $row) {
        //print_r($row);
        $j = 0;
        foreach ($keys as $key => $val) {
            $value = $row->$key;
            $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j++, $i, $value);
        }
        
        $j = $j - 6;
        foreach ($row->results as $result) {
            error_log($j);
            if ($result->method === 'Cost Method') {
                $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j+1, $i, $result->value);
            }
            
            if ($result->method === 'Royalty Method') {
                $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j+2, $i, $result->value);
            }
            
            if ($result->method === 'Profit Split Method') {
                $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j+3, $i, $result->value);
            }
            
            if ($result->method === 'Market Method') {
                $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j+4, $i, $result->value);
            }
            
            if ($result->method === 'All') {
                $objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($j+5, $i, $result->value);
            }
        }
        $i++;
    }


    
    
    header('Content-Type: application/vnd.ms-excel');
    header('Content-Disposition: attachment;filename="'. valuation. '.xls"');
    header('Cache-Control: max-age=0');
    
    $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
    $objWriter->save('php://output');