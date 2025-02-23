<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    $client = new GuzzleHttp\Client([
        'headers' => [
            'Accept' => 'application/json',
            'X-Plex-Token' => $_ENV['PLEX_TOKEN']
        ]
    ]);
    
    $response = $client->request('GET', $_ENV['PLEX_URL'] . '/library/recentlyAdded');    
    $data = json_decode($response->getBody(), true);
    
    if (!file_exists('docs/data')) {
        mkdir('docs/data', 0777, true);
    }
    
    file_put_contents(
        'docs/data/recent.json', 
        json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
    );
    
    echo "Data successfully saved to docs/data/recent.json\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}