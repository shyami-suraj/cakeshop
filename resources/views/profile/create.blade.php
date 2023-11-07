@extends('adminlte::page')
@section('content')
<h1> Add Categories </h1>

<form action="{{ route('admin.category.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <table>
        <tr>
            <td>Category Name:</td>
            <td><input type="text" name="name"></td>
        </tr>
       
        <tr>
            <td>Category Slug:</td>
            <td><input type="text" name="slug" ></td>
        </tr>
        
        <tr>
            <td>Parent Category:</td>
            <td>
                <select name="parent_id" id="category">
                    <option value="">Select</option>
                    <?php
                    foreach ($category as $category_id => $category_name) {
                    ?>
                    <option value="{{$category_id}}"> <?php echo $category_name ?></option>
                    <?php } ?>
                </select>


        
            </td>
        </tr>
        <tr>
            <td>Upload Image:</td>
            <td><input class="file-upload-input" type="file" name="image"></td>
        </tr>
     
        
    </table>
    <button type ="submit" > Create</button>
</form>
@endsection
