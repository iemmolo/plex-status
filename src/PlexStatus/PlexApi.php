<?php

namespace PlexStatus;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class PlexApi
{
    private Client $client;
    private string $token;
    private string $baseUrl;

    public function __construct(string $token, string $baseUrl)
    {
        $this->token = $token;
        $this->baseUrl = $baseUrl;
        $this->client = new Client([
            'headers' => [
                'Accept' => 'application/json',
                'X-Plex-Token' => $this->token
            ]
        ]);
    }

    public function getRecentlyAdded(): array
    {
        try {
            $response = $this->client->request('GET', $this->baseUrl . '/library/recentlyAdded');
            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            throw new \RuntimeException("Failed to fetch recently added: " . $e->getMessage());
        }
    }

    public function getServerStatus(): array
    {
        try {
            $this->client->request('GET', $this->baseUrl . '/servers');
            return ['status' => 'Online', 'timestamp' => time()];
        } catch (GuzzleException $e) {
            return [
                'status' => 'Offline',
                'error' => $e->getMessage(),
                'timestamp' => time()
            ];
        }
    }
}
