<?php

namespace Libs\Web;

class Page {

    protected static $title = "";

    static function getTitle()
    {
        return self::$title;
    }

    static function setTitle($title)
    {
        self::$title = $title;
    }

}