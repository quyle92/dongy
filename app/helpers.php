<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;
use Illuminate\Support\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\File;
use Illuminate\Filesystem\Filesystem;
use BadMethodCallException as BadMethodCallException;

const FILESYSTEM_IMAGE_PREFIX = "images";

if (!function_exists('readJson')) {
    function readJson(string $path): array
    {
        $fileExisted = Storage::disk('local')->exists($path);

        if ($fileExisted) {
            $json = Storage::disk('local')->get($path);

            return json_decode($json, true);
        }

        return [];
    } //https://www.php.net/manual/en/function.array-multisort.php
}

if (!function_exists('printBacktrace')) {
    function printBacktrace()
    {
        try {
            throw new \Exception('printBacktrace');
        } catch (\Exception $e) {
            dd($e);
        }
    }
}

if (!function_exists('getQueryLog')) {
    function getQueryLog($query)
    {
        DB::enableQueryLog();
        $query();
        dd(DB::getQueryLog());
    }
}

if (!function_exists('absolutePath')) {
    function absolutePath($path): string|null
    {
        if (empty($path)) {
            return "";
        }

        if (Str::startsWith($path, config("app.url")) && app()->isLocal()) {
            throw new BadMethodCallException("Path is already absolute.");
        }

        $path = parse_url($path, PHP_URL_PATH);
        if ($path === false) {
            throw new \InvalidArgumentException('Malformed URL: ' . $path);
        }

        $path = Str::start($path, '/');

        return config("app.url") . $path;
    }
}

if (!function_exists('relativePath')) {
    function relativePath($url): string
    {
        $parsedUrl = parse_url($url);

        if ($parsedUrl === false) {
            throw new \InvalidArgumentException('Malformed URL: ' . $parsedUrl);
        }

        if (!isset($parsedUrl['path'])) {
            throw new Exception("path component is missing in the url.");
        }

        $relativePath = $parsedUrl['path'];
        $relativePath = Str::start($relativePath, '/');

        return Str::start($relativePath, '/img');
    }
}

if (!function_exists("toIso8601String")) {
    function toIso8601String($dt): string
    {
        return Carbon::createFromFormat('Y-m-d H:i:s', $dt)->toISOString();
    }
};

if (!function_exists("hashName")) {
    function hashName(File|UploadedFile $file, string|int $prepend = ""): string
    {
        $file  = new File($file);

        $extension = '.' . $file->guessExtension();

        return ($prepend ? "$prepend-" : "") . Str::ulid()->toBase32() . $extension;
    }
};

if (!function_exists("prependAbsoluteUrl")) {

    function prependAbsoluteUrl(Collection|array $input): array
    {
        if ($input instanceof Collection) {
            $array = $input->toArray();
        } else {
            $array = $input;
        }

        foreach ($array as $key => &$value) {
            if (is_array($value)) {
                $array[$key] = prependAbsoluteUrl($value); // Recurse into nested arrays
            } else {
                if ($value instanceof stdClass) {
                    $value->image = absolutePath($value->image);
                } else {
                    if ($key === "image") {
                        $array[$key] = absolutePath($value);
                    }
                }
            }
        }
        // dd($array);
        return $array;
    }
}
if (!function_exists("createFakeImg")) {
    function createFakeImg()
    {
        $data = 'iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAMAAAB/2U7WAAAABl'
            . 'BMVEUAAAD///+l2Z/dAAAASUlEQVR4XqWQUQoAIAxC2/0vXZDr'
            . 'EX4IJTRkb7lobNUStXsB0jIXIAMSsQnWlsV+wULF4Avk9fLq2r'
            . '8a5HSE35Q3eO2XP1A1wQkZSgETvDtKdQAAAABJRU5ErkJggg==';
        $data = base64_decode($data);
        $imgRaw = imagecreatefromstring($data);
        if ($imgRaw !== false) {
            imagejpeg($imgRaw, storage_path() . '/app/testing/tmp.jpg', 100);
            imagedestroy($imgRaw);
            $file =  new UploadedFile(storage_path() . '/app/testing/tmp.jpg', 'tmp.jpg', 'image/jpeg', null, true);
            // DO STUFF WITH THE UploadedFile
        }

        return $file;
    }
}

//https://stackoverflow.com/a/55112255/11297747
if (!function_exists("compareMultiArrays")) {
    function compareMultiArrays($array1, $array2): array
    {
        $result = array("more" => array(), "less" => array(), "diff" => array());
        foreach ($array1 as $k => $v) {
            if (is_array($v) && isset($array2[$k]) && is_array($array2[$k])) {
                $sub_result = compareMultiArrays($v, $array2[$k]);
                //merge results
                foreach (array_keys($sub_result) as $key) {
                    if (!empty($sub_result[$key])) {
                        $result[$key] = array_merge_recursive($result[$key], array($k => $sub_result[$key]));
                    }
                }
            } else {
                if (isset($array2[$k])) {
                    if ($v !== $array2[$k]) {
                        $result["diff"][$k] = array("from" => $v, "to" => $array2[$k]);
                    }
                } else {
                    $result["more"][$k] = $v;
                }
            }
        }
        foreach ($array2 as $k => $v) {
            if (!isset($array1[$k])) {
                $result["less"][$k] = $v;
            }
        }

        return $result;
    }
}

if (!function_exists("isArrayEqual")) {
    function isArrayEqual(array $array1, array  $array2): bool
    {
        $rs  = compareMultiArrays($array1, $array2);

        if (count($rs["more"]) === 0 && count($rs["less"]) === 0 && count($rs["diff"]) === 0) {
            return true;
        } else {
            return false;
        }
    }
}

if (!function_exists("floatFormat")) {
    function floatFormat(int|float $num): float
    {
        return number_format((float)($num), 2, '.', '');
    }
}

if (!function_exists("deleteDirectoryIfEmpty")) {
    function deleteDirectoryIfEmpty(string $path): void
    {
        $fileSystem = new Filesystem();
        $directory = Storage::path(dirname($path));

        if ($fileSystem->exists($directory)) {
            $files = $fileSystem->files($directory);

            if (empty($files)) {
                $fileSystem->deleteDirectory($directory);
            }
        }
    }
}

if (!function_exists("isNullOrEmpty")) {
    function isNullOrEmpty($val): bool
    {
        return $val === null || $val === "" ? true : false;
    }
}

if (!function_exists("parseBool")) {
    function parseBool($val): bool
    {
        return filter_var($val, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
    }
}

if (!function_exists("extractImagePaths")) {
    function extractImagePaths($content)
    {
        preg_match_all('/<img[^>]+src=["\']([^"\']+)["\']/i', $content, $matches);
        return $matches[1] ?? []; // Return all extracted image paths
    }
}
