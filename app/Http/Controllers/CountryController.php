<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Country;
use App\Http\Services\CountryService;

class CountryController extends Controller
{
    public $service;
    public function __construct(){

        //$this->middleware('auth');

        //$this->middleware('role:ROLE_ADMIN');

        // calling service
        $this->service = new CountryService();
    }

    function index(Request $request){
//      all db data are stored       service/fuc name = all
        $country = $this->service->all();

        return view('country.index', compact('country'));
    }
    public function create()
    {
        return view('country.create');

    }
    public function store(Request $request){
        $id = $request->input('id');
        if(empty($id)){
            $addcountry = $this->service->insert($request);
        }
        else{
            $addcountry = $this->service->update($request,$id);
        }
        
        return redirect()->route('admin.country.index');  
    }
    public function edit($id)
    {
        $country =  Country::find($id);

        return view('country.edit',compact('id', 'country'));
    }
    public function destroy($id){
        $this->service->delete($id);
        return redirect()->route('admin.country.index');        
    }
}