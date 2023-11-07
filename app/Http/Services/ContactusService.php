<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Contactus;

class ContactusService{
                    // index
    public function all(){
        $Contactuses = Contactus::all();
        return $Contactuses;
    }


    public function update(Request $request, $id){

        $Contactuses = Contactus::where('id', $id)->first();

        if(!empty($request->input('map'))){
            $map = $request->input('map');
            $Contactuses->map = $map;
        }
        if(!empty($request->input('address'))){
            $address = $request->input('address');
            $Contactuses->address = $address;

        if(!empty($request->input('mail'))){
            $mail = $request->input('mail');
            $Contactuses->mail = $mail;
        }
        if(!empty($request->input('phone'))){
            $phone = $request->input('phone');
            $Contactuses->phone = $phone;
        }
        if(!empty($request->input('date'))){
            $date = $request->input('date');
            $Contactuses->date = $date;
        }


		try
		{
            $Contactuses->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }
    }


}
}
