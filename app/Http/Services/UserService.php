<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\User;

class UserService{
                    // index
    public function all(){
        $user = User::where('user_type','!=','admin')->get();
        return $user;
    }

    public function getItem($id){
        $user = User::where('id', $id)->first();
        return $user;
    }
                    // store
    public function insert(Request $request){

        $user = new User();

        $user->name = $request->input('name');
        $user->phone = $request->input('phone');
        $user->email = $request->input('email');
        $user->user_type = $request->input('user_type');
        $user->password= bcrypt($request->input('password'));


// return $user;
        // print_r($user);
        // die();
        try
		{
            $user->save();
         return ['status' => 'success', 'msg' => 'user added'];
            ;
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Inserting Record'];
        }
    }

    public function update(Request $request, $id){

        $user = User::where('id', $id)->first();

        if(!empty($request->input('name'))){
            $name = $request->input('name');
            $user->name = $name;
        }
        if(!empty($request->input('phone'))){
            $phone = $request->input('phone');
            $user->phone = $phone;
        }
        if(!empty($request->input('email'))){
            $email= $request->input('email');
            $user->email = $email;
        }
        if(!empty($request->input('user_type'))){
            $user_type= $request->input('user_type');
            $user->user_type = $user_type;
        }




		try
		{
            $user->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }
    }

    public function delete($id){
		$user = User::where('id', $id)->first();
        $user->delete();
		return ['status' => 'success', 'msg' => ''];
    }
}
