<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Slider;
use App\Http\Services\SliderService;

class SliderController extends Controller
{
    public $service;
    public function __construct(){

       $this->service = new SliderService();
    }
    function index(Request $request){
        $slider = $this->service->all();

        return view('slider.index', compact('slider'));
    }
    public function create()
    {
        $slider = Slider::All();

        return view('slider.create',compact('slider'));
    }
    public function store(Request $request){
        $id = $request->input('id');
        if(empty($id)){
            $addslider = $this->service->insert($request);
        }
        else{
            $addslider = $this->service->update($request,$id);
        }

        //return redirect()->route('admin.slider.index');
    }
    public function edit($id)
    {

        $slider =  Slider::find($id);


        return view('slider.edit',compact('id','slider'));
    }
    public function destroy($id){
        $this->service->delete($id);
        return redirect()->route('admin.slider.index');
    }
}
