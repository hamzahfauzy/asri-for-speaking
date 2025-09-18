<?php

namespace Libs\System;

class File
{

    public function __construct(protected $processFile, protected $isHtml = false){}

    public function exec()
    {
        if(!$this->isHtml)
        {
            return require $this->processFile .'.php';
        }

        require $this->processFile .'.php';
        die;
    }
}