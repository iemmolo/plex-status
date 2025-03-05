<?php
namespace PlexStatus;

class DataSanitizer {
    private array $config;

    public function __construct() {
        $this->config = require 'config.php';
    }

    public function sanitize(array $data): array {
        return $this->filterByConfig($data, $this->config['sanitize']);
    }

    private function filterByConfig(array $data, array $rules): array {
        $filtered = [];

        foreach ($data as $key => $value) {
            if (isset($rules[$key]) && $rules[$key] === false) {
                continue;
            }

            if (is_array($value)) {
                if (isset($rules[$key]) && is_array($rules[$key])) {
                    if (array_key_exists(0, $value)) {
                        $filtered[$key] = array_map(
                            fn($item) => is_array($item) ? $this->filterByConfig($item, $rules[$key]) : $item,
                            $value
                        );
                    } else {
                        $filtered[$key] = $this->filterByConfig($value, $rules[$key]);
                    }
                } else {
                    $filtered[$key] = array_key_exists(0, $value)
                        ? array_map(fn($item) => is_array($item) ? $this->filterByConfig($item, $rules) : $item, $value)
                        : $this->filterByConfig($value, $rules);
                }
            } else {
                $filtered[$key] = $value;
            }
        }

        return $filtered;
    }
}