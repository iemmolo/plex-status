<?php

require 'vendor/autoload.php';

use PlexStatus\PlexApi;
use PlexStatus\DataWriter;
use PlexStatus\DataSanitizer;

try {
    $plexToken = getenv('PLEX_TOKEN');
    $plexUrl = getenv('PLEX_URL');

    if (!$plexToken || !$plexUrl) {
        throw new \RuntimeException('PLEX_TOKEN and PLEX_URL environment variables are required');
    }

    $plex = new PlexApi($plexToken, $plexUrl);

    $data = $plex->getRecentlyAdded();
    $sanitizer = new DataSanitizer();
    $cleanData = $sanitizer->sanitize($data);
    $writer = new DataWriter('docs/data/recent.json');
    $writer->write($cleanData);

    $data = $plex->getServerStatus();
    $cleanData = $sanitizer->sanitize($data);
    $writer = new DataWriter('docs/data/status.json');
    $writer->write($cleanData);


    echo "Data successfully saved to docs/data/recent.json\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}