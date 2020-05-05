<?php

set_error_handler(
    create_function(
        '$severity, $message, $file, $line',
        'throw new ErrorException($message, $severity, $severity, $file, $line);'
    )
);
try {
    $file = file_get_contents($_GET['requrl']);
    echo ($file);
}
catch (Exception $e) {
    //gör ingenting
    //echo $e->getMessage();
}
restore_error_handler();

?>