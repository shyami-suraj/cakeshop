<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Country;

class CountryService{
                    // index
    public function all(){
        $country = Country::all();
        return $country;
    }

    public function getItem($id){
        $country = Country::where('id', $id)->first();
        return $country;
    }
                    // store
    public function insert(Request $request){
        $country = new Country();

        $country->country_name = $request->input('country_name');   
        try
		{
            $country->save();
            return ['status' => 'success', 'msg' => ''];
        }
        catch(Exception $e){
            return ['status' => 'error', 'msg' => 'Error Inserting Record'];
        }
    }

    public function update(Request $request, $id){
        
        $country = Country::where('id', $id)->first();
        
        // if(!empty($request->input('country_name'))){
        //     $country_name = $request->input('country_name)');
        //     $country->country_name = $country_name;

        // }
        $country->country_name=$request->input('country_name');

		try
		{
            $country->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }
    }

    public function delete($id){
		$country = Country::where('id', $id)->first();
        $country->delete();
		return ['status' => 'success', 'msg' => ''];
    }
}