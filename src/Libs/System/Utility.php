<?php

namespace Libs\System;

class Utility
{
    static function parentPath()
    {
        $parent_path = '../';
        if (in_array(php_sapi_name(),["cli"])) {
            $parent_path = '';
        }

        return $parent_path;
    }
}