<?php

use Dotenv\Dotenv;
use Libs\Web\Session;

session_start();

require '../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__ . '//../../');
$dotenv->safeLoad();

function isFile($fileName)
{
    return !is_array($fileName) && get_class($fileName) == 'Libs\\System\\File';
}

function app($key, $default = null)
{
    $config = config('app');
    return isset($config[$key]) ? $config[$key] : $default;
}

function env($key, $default = null)
{
    return isset($_ENV[$key]) ? $_ENV[$key] : (isset($_SERVER[$key]) ? $_SERVER[$key] : $default);
}

function config($key)
{
    $file =  '../config/' . $key .'.php';

    if(file_exists($file))
    {
        return require $file;
    }

    return [];
}

function sessionRequired()
{
    if(!isset($_SESSION['user_id']))
    {
        header('location: /login');
        die;
    }
}

function checkSession()
{
    if(isset($_SESSION['user_id']))
    {
        header('location: /home');
        die;
    }
}

function loadFile($path, $additionalCode = null)
{
    require $path .'.php';
}

function auth()
{
    return Session::get('auth');
}

function setAlert($color, $alert, $title)
{
    $_SESSION['pesan'] = $alert;
    $_SESSION['color'] = $color;
    $_SESSION['title'] = $title;
}

function getAlert($posisi)
{
    if (isset($_SESSION['pesan'])) {
        $pesan = $_SESSION['pesan'];
        $color = $_SESSION['color'];
        $title = $_SESSION['title'];
        $pukul = date('H:i');
        echo
        "<div class='bs-toast toast toast-placement-ex $color  $posisi ' role='alert' aria-live='assertive' aria-atomic='true'>
                <div class='toast-header'>
                  <i class='bx bx-bell me-2'></i>
                  <div class='me-auto fw-semibold'>  $title </div>
                  <small>" . $pukul  . "</small>
                  <button type='button' class='btn-close' data-bs-dismiss='toast' aria-label='Close'></button>
                </div>
                <div class='toast-body'> $pesan </div>
              </div>";
        unset($_SESSION['pesan']);
    }
}