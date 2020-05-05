<?php
//header('Content-Type: text/html');
//$file = file_get_contents($_GET['requrl']);
$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $_GET['requrl']);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, FALSE);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
	$response = curl_exec($ch);
	echo $response;
	curl_close($ch);
//echo ($file);
?>