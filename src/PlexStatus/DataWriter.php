<?php

namespace PlexStatus;

class DataWriter
{
    private string $outputPath;

    public function __construct(string $outputPath)
    {
        $this->outputPath = $outputPath;
    }

    public function write(array $data): void
    {
        $directory = dirname($this->outputPath);
        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }

        file_put_contents(
            $this->outputPath,
            json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)
        );
    }
}