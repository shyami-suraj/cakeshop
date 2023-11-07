<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Location;

class LocationService{
                    // index
    public function all(){
        $location = Location::all();
        return $location;
    }

    public function getItem($id){
        $location = Location::where('id', $id)->first();
        return $location;
    }
                    // store
    public function insert(Request $request){
        $location=new Location();
        $location->country_id = $request->input('country_id');
        $location->city = $request->input('city');  

       
        try
		{
            $location->save();
            return ['status' => 'success', 'msg' => ''];
        }
        catch(Exception $e){
            return ['status' => 'error', 'msg' => 'Error Inserting Record'];
        }
    }

    public function update(Request $request, $id){
        
        $location = Location::where('id', $id)->first();
        
     
        $location->country_id=$request->input('country_id');
        $location->city=$request->input('city');


		try
		{
            $location->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }
    }


    public function delete($id){
		$location = Location::where('id', $id)->first();
        $location->delete();
		return ['status' => 'success', 'msg' => ''];
    }
}