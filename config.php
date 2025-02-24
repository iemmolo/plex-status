<?php

return [
    'sanitize' => [
        'MediaContainer' => [
            'Server' => false,
            'size' => false,
            'allowSync' => false,
            'identifier' => false,
            'mediaTagPrefix' => false,
            'Metadata' => [
                'file' => false,
                'token' => false,
                'guid' => false,
                'key' => false,
                'allowSync' => false,
                'librarySectionID' => false,
                'librarySectionTitle' => false,
                'librarySectionUUID' => false,
                'parentGuid' => false,
                'Media' => [
                    'Part' => [
                        'file' => false,
                        'size' => false
                    ]
                ],
                'Part' => [
                    'file' => false,
                    'key' => false
                ]
            ],
            'mediaTagVersion' => false,
            'mixedParents' => false
        ]
    ]
];
