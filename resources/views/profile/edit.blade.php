@extends('adminlte::page')
@section('content')
    <h1> Edit Categories </h1>

    <form action="{{ route('admin.category.update', [$category->id]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <table>
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$category['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr>
                <td>Category Name:</td>
                <td><input type="text" name="name" value="{{ $category['name'] }}"></td>
            </tr>
            
            <tr>
                <td>Category Slug:</td>
                <td><input type="text" name="slug" value="{{ $category['slug'] }}"></td>
            </tr>

            <tr>
                <td>Parent Category:</td>
                <select name="parent_id" id="category">
                    <option value="">Select</option>
                    <?php
                    foreach ($categories as $category_id => $category_name) {
                        
                    ?>
                    <option value="{{$category_id}}"> <?php echo $category_name ?></option>
                    <?php } ?>
                </select>

            </tr>
            <tr>
                <td>Upload Image:</td>
                <td><input class="file-upload-input" type="file" value="{{ $category['image'] }}"></td>
            </tr>


        </table>
        <button type="submit" value=""> Update</button>
        {{-- </form> --}}
    @endsection
