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

        $data['password'] = md5($data['password']);
        $data['level'] = 'student';

        $user = DB::table('users')->insert($data);

        if($user)
        {
            $user = DB::table('users')->where('id', $user)->first();
            Session::set(['user_id'=>$user['id']]);
            setAlert('bg-success', 'Selamat Datang - ' . $user['name'], 'Successfully');
            header('location: /home');
            die;
        }

        setAlert('bg-danger', 'Pendaftaran gagal!', 'Failed');
        header('location: /login');
        die;
    }

    public function logout()
    {
        Session::destroy();
        header('location: /login');
        die;
    }

    public function resetPassword()
    {
        $username = $_POST['username'];

        $user = DB::table('users')->where('username', $username)->first();

        if($user)
        {
            $new_pass = substr(md5(time()), 0, 6);
            $md5_pass = md5($new_pass);
            $user = DB::table('users')->where('id', $user['id'])->update([
                'password' => $md5_pass
            ]);

            Session::set(['forgot_password'=>$new_pass]);
            header('location: /forgot-password');
            die;
        }

        setAlert('bg-danger', 'Reset password gagal. Username tidak ditemukan!', 'Failed');
        header('location: /forgot-password');
        die;
    }

}