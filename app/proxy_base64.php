<?php 
header('Content-Type: application/json');
require_once("config.in.php");
$url = "https://api.aiforthai.in.th/t-face/base64/" . $project_id;

$json =json_decode(file_get_contents('php://input'));
$base64 = $json->image;
$data = json_encode(array('image' => ''.$base64));

 $headers = array(
   'Content-Type:application/json',
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
 