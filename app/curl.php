<?php
$api_key = getenv('API_KEY');
$project_id = getenv('PROJECT_ID');
$url = "https://api.aiforthai.in.th/t-face/bin/" . $project_id;
// $url = "http://10.222.40.116:5323/project/search/bin/" . $project_id;




$filename = "/app/images/tface_test01.jpg";
$file = curl_file_create('$filename');
// $file_contents = file_get_contents($filename);    

$data = array( 'file' => $file);

 $headers = array(
 'Apikey: '.$api_key
 );
 $handle = curl_init($url);
 curl_setopt($handle, CURLOPT_POST, true);
 curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
 curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
 curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
 curl_setopt($handle, CURLOPT_VERBOSE, true);

 $output =curl_exec($handle);
 print_r($output);