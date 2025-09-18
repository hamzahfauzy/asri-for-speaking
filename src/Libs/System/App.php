<?php

namespace Libs\System;

use Libs\Web\Response;

class App
{
    static function getRequestPath()
    {
        $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
        
        $request_uri = strtok($uri, '?');
        
        return $request_uri != '/' ? trim($request_uri,'/') : '/';
    }

    // static function 

    static function render()
    {

        require 'src/Libs/functions.php';
        require 'config/routes.php';

        $allRoutes     = \Libs\Web\Route::getAllRoutes();
        $requestPath   = self::getRequestPath();
        $requestMethod = isset($_POST['_method']) ? $_POST['_method'] : $_SERVER['REQUEST_METHOD'];

        if(isset($_POST['_method']))
        {
            unset($_POST['_method']);
        }

        $response = null;

        $uriName = strtolower($requestMethod) .'.'. $requestPath;

        if(isset($allRoutes[$uriName]))
        {
            $route = $allRoutes[$uriName];

            \Libs\Web\Route::setActive($uriName);

            if(!empty($route['beforeEnter']))
            {
                call_user_func($route['beforeEnter']);
            }

            if(is_callable($route['callback']))
            {
                $response = $route['callback']();
            }
            else if(isFile($route['callback']))
            {
                $response = $route['callback']->exec();
            }
            else if(is_array($route['callback']))
            {
                $callback = $route['callback'];
                $response = (new Controller($callback[0], $callback[1]))->exec();
            }
        }
        else
        {
            Response::notFound();
        }

        if(is_array($response) || is_object($response))
        {
            $response = json_encode($response);
        }

        echo $response;
    }
}