<?php
// main  serivce where we code then call it  in api and normal controller

namespace App\Http\Services;

use Illuminate\Http\Request;
use App\Models\Slider;

class sliderService{
                    // index
    public function all(){
        $slider = Slider::all();
        return $slider;
    }

    public function getItem($id){
        $slider = Slider::where('id', $id)->first();
        return $slider;
    }
                    // store
    public function insert(Request $request){

        $slider = new Slider();
        $slider->name = $request->input('name');
        $slider->detail = $request->input('detail');


        $imageName = time().'.'.$request->image->extension();

        $request->image->move(public_path('images'), $imageName);

        $slider->image = $imageName;


        try
		{
            $slider->save();
            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Inserting Record'];
        }
    }

    public function update(Request $request, $id){

        $slider = Slider::where('id', $id)->first();
        if(!empty($request->input('name'))){
            $name = $request->input('name');
            $slider->name = $name;
        }
        if(!empty($request->input('detail'))){
            $detail = $request->input('detail');
            $slider->detail = $detail;

        if (!empty ($request->image)){

          $imageName = time().'.'.$request->image->extension();

        $request->image->move(public_path('images'), $imageName);

        $slider->image = $imageName;

            }

        }

		try
		{
            $slider->save();

            return ['status' => 'success', 'msg' => ''];
        }
        catch(\Exception $e){
            return ['status' => 'error', 'msg' => 'Error Updating Record'];
        }
    }

    public function delete($id){
		$slider = Slider::where('id', $id)->first();
        $slider->delete();
		return ['status' => 'success', 'msg' => ''];
    }
}
