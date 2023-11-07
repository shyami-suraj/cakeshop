<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\logopage;

class logopageService{

    public function all(){
        $logopage = Logopage::all();
        return $logopage;
    }
                                            // url ko id
    public function update(Request $request, $id){
                                    // dbko id
            $logopage=Logopage::where('id',$id)->first();

            if(!empty($request->input('title'))){
                $title=$request->input('title');
                $logopage->title=$title;
            }
            if (!empty ($request->image)){

                $imageName = time().'.'.$request->image->extension();

                $request->image->move(public_path('images'), $imageName);

                $logopage->image = $imageName;

                }



         try
		{
            $logopage->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }








    }


}
