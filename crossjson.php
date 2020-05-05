<?php
header('Content-Type: application/json');
//$file = json_decode(file_get_contents($_GET['requrl']));
$url= $_GET['requrl'] . "?apikey=xxxxxx&format=json";
$file = file_get_contents($url);
echo ($file);
?>