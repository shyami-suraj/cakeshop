<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\User;
use App\Http\Services\CategoryService;

class CategoryController extends Controller
{
    public $service;
    public function __construct(){

        //$this->middleware('auth');

        //$this->middleware('role:ROLE_ADMIN');

        // calling service
        $this->service = new CategoryService();
    }

    function index(Request $request){
        $category = $this->service->all();

        return view('category.index', compact('category'));
    }
    public function create()
    {

        $category = $this->service->all();


        $categories = Category::pluck('name', 'id');

        return view('category.create', compact('category','categories'));

    }
    public function store(Request $request){
        $id = $request->input('id');
        if(empty($id)){
            $addcategory = $this->service->insert($request);
        }
        else{
            $addcategory = $this->service->update($request,$id);
        }

        return redirect()->route('admin.category.index');
    }
    public function edit($id)
    {
        $category =  Category::find($id);
        $categories = Category::where('id', '!=', $id)->pluck('name', 'id');

        return view('category.edit',compact('id', 'category', 'categories'));
    }
    public function destroy($id){
        $this->service->delete($id);
        return redirect()->route('admin.category.index');
    }
}
