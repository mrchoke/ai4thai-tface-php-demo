<?php 
header('Content-Type: application/json');
require_once("config.in.php");
$url = "https://api.aiforthai.in.th/t-face/bin/" . $project_id;

$filename =$_FILES["file"]["tmp_name"];
$data = array('file' => new CURLFile($filename));

 $headers = array(
 'Apikey: '.$api_key
 );
 $handle = curl_init($url);
 curl_setopt($handle, CURLOPT_POST, true);
 curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
 curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);
 curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
 curl_setopt($handle, CURLOPT_VERBOSE, false);

 $output =curl_exec($handle);

echo $output;
 