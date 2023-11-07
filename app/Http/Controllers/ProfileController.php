<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;


class ProfileController extends Controller{
    public function index(){
        return view('profile');
    }
    public function update(User $user, Request $request){
        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,

            'email' => $request->email,
            // 'password' => bcrypt($request->password),
            'updated_at' => now()
        ]);

        return redirect()->route('admin.profile');

    
    }

}
