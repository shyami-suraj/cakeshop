<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Services\AboutusService;
use App\Models\Aboutus;

class AboutusController extends Controller
{
    public $service;
    public function __construct(){

        //$this->middleware('auth');

        //$this->middleware('role:ROLE_ADMIN');

        // calling service
        $this->service = new AboutusService;
    }
    public function index(Request $request){

        $aboutus =$this->service->all()->first();

        return view('aboutus.edit',compact('aboutus'));
    }
    public function store(Request $request){
                            // db ko id
        $id= $request->input('id');
        $addaboutus=$this->service->update($request,$id);
        return redirect()->route('admin.aboutus.index');

    }

    function edit($id){
        $aboutus=Aboutus::All();
        return view('aboutus.edit',compact('aboutus'));
    }

}
