<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Aboutus;

class AboutusService{

    public function all(){
        $aboutus = Aboutus::all();
        return $aboutus;
    }   
                                            // url ko id
    public function update(Request $request, $id){
                                    // dbko id
            $aboutus=Aboutus::where('id',$id)->first();

            if(!empty($request->input('title'))){
                $title=$request->input('title');
                $aboutus->title=$title;
            }

            if(!empty($request->input('desc'))){
                $desc=$request->input('desc');
                $aboutus->desc=$desc;
            }
            if (!empty ($request->image)){

                $imageName = time().'.'.$request->image->extension();
    
                $request->image->move(public_path('images'), $imageName);
    
                $aboutus->image = $imageName;
    
                }



         try
		{
            $aboutus->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }








    }

    
}
