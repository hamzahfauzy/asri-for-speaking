<?php

namespace Libs\System;

class Controller
{

    public function __construct(protected $className, protected $method){}

    public function exec()
    {
        $class = new $this->className;

        return $class->{$this->method}();
    }
}