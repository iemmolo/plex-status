<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

$plexToken = getenv('PLEX_TOKEN');
$plexUrl = getenv('PLEX_URL');

echo "Debug: Using URL: {$plexUrl}\n";
echo "Debug: Token present: " . (!empty($plexToken) ? 'Yes' : 'No') . "\n";

try {
    $client = new GuzzleHttp\Client([
        'headers' => [
            'Accept' => 'application/json',
            'X-Plex-Token' => $plexToken
        ],
        'timeout' => 5 // Lower timeout to fail faster
    ]);
    
    echo "Debug: Making request to: {$plexUrl}/library/recentlyAdded\n";
    
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