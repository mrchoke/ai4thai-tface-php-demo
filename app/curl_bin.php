<?php
require_once("config.in.php");

$url = "https://api.aiforthai.in.th/t-face/bin/" . $project_id;

$filename = "/app/images/tface_test01.jpg";
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
 $res = json_decode($output);
// print_r($res);
 
if ( isset($res->boxes)) {
  echo "Found: " . sizeof($res->boxes). " faces.\n";
    foreach ($res->result as $k => $v) {
      echo "Face #".$k." --> " ;
      echo $v[0]->filename.": " ;
      echo number_format((float)$v[0]->score * 100, 2, '.', '')."\n";
    }
} else {
  echo "Face Not Found in Photo";
}
 
 