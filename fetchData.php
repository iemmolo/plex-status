<?php

require 'vendor/autoload.php';

use PlexStatus\PlexApi;
use PlexStatus\DataWriter;

try {
    $plexToken = getenv('PLEX_TOKEN');
    $plexUrl = getenv('PLEX_URL');

    if (!$plexToken || !$plexUrl) {
        throw new \RuntimeException('PLEX_TOKEN and PLEX_URL environment variables are required');
    }

    $plex = new PlexApi($plexToken, $plexUrl);
    $writer = new DataWriter('docs/data/recent.json');

    $data = $plex->getRecentlyAdded();
    $writer->write($data);

    echo "Data successfully saved to docs/data/recent.json\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    exit(1);
}