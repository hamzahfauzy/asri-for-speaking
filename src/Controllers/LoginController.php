<?php

namespace Controllers;

use Libs\Database\DB;
use Libs\Web\Response;
use Libs\Web\Session;

class LoginController {

    public function login()
    {
        $data = $_POST;

        $user = DB::table('users')->where('username', $data['username'])->where('password', md5($data['password']))->first();

        if($user)
        {
            Session::set(['user_id'=>$user['id']]);
            setAlert('bg-success', 'Selamat Datang - ' . $user['name'], 'Successfully');
            header('location: /home');
            die;
        }

        setAlert('bg-danger', 'Username dan Password tidak valid!', 'Failed');
        header('location: /login');
        die;
    }
    
    public function register()
    {
        $data = $_POST;

        $user = DB::table('users')->insert([
            'name' => $data['name'],
            'username' => $data['username'],
            'password' => md5($data['password'])
        ]);

        if($user)
        {
            Session::set(['user_id'=>$user['id']]);
            return Response::json([], 'success');
        }

        return Response::json([], 'failed', 400);
    }

    public function logout()
    {
        Session::destroy();
        header('location: /login');
        die;
    }

}