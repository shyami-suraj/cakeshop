<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Location;
use App\Models\Country;
use App\Http\Services\LocationService;


class LocationController extends Controller
{
    public $service;
    public function __construct(){

        //$this->middleware('auth');

        //$this->middleware('role:ROLE_ADMIN');

        // calling service
        $this->service = new LocationService();
    }

    function index(Request $request){
        $location = $this->service->all();

        return view('location.index', compact('location'));
    }
    public function create()
    {

        $location = $this->service->all();
        $countries = Country::pluck('country_name', 'id');

        return view('location.create', compact('location', 'countries'));

    }
    public function store(Request $request){
        $id = $request->input('id');
        if(empty($id)){
            $addlocation = $this->service->insert($request);
        }
        else{
            $addlocation = $this->service->update($request,$id);
        }

        return redirect()->route('admin.location.index');
    }
    public function edit($id)
    {

        $location =  Location::find($id);
        $countries = Country::pluck('country_name', 'id');




        return view('location.edit',compact('id', 'location', 'countries'));
    }
    public function destroy($id){
        $this->service->delete($id);
        return redirect()->route('admin.location.index');
    }
}




