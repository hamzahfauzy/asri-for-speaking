<?php

function my_autoloader($class) {

    // explode namespace
    $classes = explode('\\', $class);
    if(in_array($classes[0], ['Controllers', 'Libs']))
    {
        $classType = $classes[0];
        // unset($classes[0]);
        $importClass = '../src/' . implode('/',$classes);

        if(file_exists($importClass.'.php'))
        {
            require $importClass.'.php';
        }
        else
        {
            die($class . ' is not valid');
        }
    }
    else
    {
        $importClass = implode('/',$classes);

        if(file_exists('../'.$importClass.'.php'))
        {
            require $importClass.'.php';
        }
        else
        {
            die($class . ' is not valid');
        }
    }
}

spl_autoload_register('my_autoloader');
