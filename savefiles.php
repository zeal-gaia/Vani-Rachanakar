<?php

$baseDir = __DIR__;

$pre  = file_get_contents($baseDir . "/pre.txt");
$post = file_get_contents($baseDir . "/post.txt");
$filename = isset($_POST['filename']) ? basename($_POST['filename']) : "conv.html";

if (strtolower(pathinfo($filename, PATHINFO_EXTENSION)) !== 'html') {
    $filename .= '.html';
}

$text = isset($_POST['text']) ? json_decode($_POST['text'], true) : [];
$voices = isset($_POST['voices']) ? json_decode($_POST['voices'], true) : [];

$textJson       = json_encode($text, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
$voicesJson     = json_encode($voices, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

$script = "<script>\n" .
          "var text = $textJson;\n" . 
          "var voices = $voicesJson;\n" .
          "</script>";

$html = $pre . $script . $post;

file_put_contents($baseDir . '/' . $filename, $html);
?>

