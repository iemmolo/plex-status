<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

// Load config file
$config = require 'config.php';

// Try environment variables first, fall back to config file
$plexToken = getenv('PLEX_TOKEN') ?: $config['plex']['token'];
$plexUrl = getenv('PLEX_URL') ?: $config['plex']['base_url'];

try {
    $client = new GuzzleHttp\Client([
        'headers' => [
            'Accept' => 'application/json',
            'X-Plex-Token' => $plexToken
        ]
    ]);
    
    $response = $client->request('GET', $plexUrl . '/library/recentlyAdded');
    
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