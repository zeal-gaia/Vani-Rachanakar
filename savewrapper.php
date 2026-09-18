<?php

$baseDir = __DIR__;

$filename = isset($_POST['filename']) ? $_POST['filename'] : "conv.html";

if (strtolower(pathinfo($filename, PATHINFO_EXTENSION)) !== 'html') {
    $filename .= '.html';
}

$text = isset($_POST['text']) ? $_POST['text'] : [];

file_put_contents($baseDir . '/' . $filename, $text);
?>

