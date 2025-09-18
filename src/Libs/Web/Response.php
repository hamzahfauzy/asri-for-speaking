<?php

namespace Libs\Web;

class Response
{
    static function json($data, $message, $httpStatus = 200)
    {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($httpStatus);
        echo json_encode([
            'data' => $data,
            'message' => $message
        ]);
        die();
    }

    static function view($file, $data = [])
    {
        $viewFile    = $file . '.php';
        if(file_exists($viewFile))
        {
            extract($data);
            ob_start();

            require $viewFile;
            
            return ob_get_clean();
        }
        else
        {
            http_response_code(404);
            die('Error 404. '.$viewFile.' Not Found.');
        }
    }

    static function notFound()
    {
        die('Error 404. Not Found.');
    }
}