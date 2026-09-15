<?php

header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

$text  = $input['text'] ?? '';
$voice = $input['voice'] ?? 'shubh';
$pace  = $input['pace'] ?? 1.0;

$env = parse_ini_file('tts.env'); 
$apiKey = $env['SARVAM_API_KEY'];

$data = [
    'model' => 'bulbul:v3',
    'text' => $text,
    'language_code' => 'en-IN',
    'speaker' => $voice,
    'pace' => $pace,
    'output_audio_codec' => 'mp3'
];

$ch = curl_init('https://api.sarvam.ai/text-to-speech');

curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'api-subscription-key: ' . $apiKey,
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_RETURNTRANSFER => true
]);

$result = curl_exec($ch);

if ($result === false) {
    http_response_code(500);
    echo json_encode([
        'error' => curl_error($ch)
    ]);
    exit;
}

curl_close($ch);

echo $result;
?>
