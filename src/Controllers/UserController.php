<?php

namespace Controllers;

use Libs\Database\DB;

class UserController {

    function store()
    {
        $redirect = $_POST['redirect'];
        unset($_POST['redirect']);
        $_POST['password'] = md5($_POST['password']);
        DB::table('users')->insert($_POST);

        setAlert('bg-success', 'Data berhasil disimpan', 'Successfully');
        header('location: ' . $redirect);
        die;
    }
    
    function update()
    {
        $id = $_GET['id'];
        $redirect = $_POST['redirect'];
        $user = DB::table('users')->where('id', $id)->first();
        unset($_POST['redirect']);
        $_POST['password'] = !empty($_POST['password']) ? md5($_POST['password']) : $user['password'];
        DB::table('users')->where('id', $id)->update($_POST);

        setAlert('bg-success', 'Data berhasil diupdate', 'Successfully');
        header('location: ' . $redirect);
        die;
    }
    
    function delete()
    {
        $id = $_GET['id'];
        $redirect = $_POST['redirect'];
        DB::table('users')->where('id', $id)->delete();

        setAlert('bg-success', 'Data berhasil dihapus', 'Successfully');
        header('location: ' . $redirect);
        die;
    }
    
}