<?php

namespace Controllers;

use Libs\Database\DB;

class ProfileController {

    function updatePassword()
    {
        $id = auth()['id'];
        if($_POST['password'] == $_POST['confirm'])
        {
            DB::table('users')->where('id', $id)->update([
                'password' => md5($_POST['password'])
            ]);
    
            setAlert('bg-success', 'Password berhasil diupdate', 'Successfully');
        }
        else
        {
            setAlert('bg-danger', 'Password gagal diupdate', 'Failed');
        }
        header('location: /change-password');
        die;
    }
    
    function updateProfile()
    {
        $id = auth()['id'];
        $user = DB::table('users')->where('id', $id)->first();
        $_POST['password'] = !empty($_POST['password']) ? md5($_POST['password']) : $user['password'];
        DB::table('users')->where('id', $id)->update($_POST);

        setAlert('bg-success', 'Profile berhasil diupdate', 'Successfully');
        header('location: /profile');
        die;
    }
    
}