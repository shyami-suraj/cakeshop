@extends('adminlte::page')
@section('content')
    <div class="c-container">
        <h1 class="heading"> Add Categories </h1>

        <form action="{{ route('admin.category.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <table class="c-form">
                <tr>
                    <td>Category Name:</td>
                    <td><input type="text" name="name" class="input" required>
                    </td>
                </tr>

                <tr>
                    <td>Category Slug:</td>
                    <td><input type="text" name="slug" class="input" required>
                    </td>
                </tr>

                <tr>
                    <td>Parent Category:</td>
                    <td>
                        <select class="select" name="parent_id" id="category"  >
                            <option value="">Select</option>
                            <?php

                     // create func variable = $categories
                    foreach ($categories as $category_id => $category_name) {
                    ?>
                            <option value="{{ $category_id }}"> <?php echo $category_name; ?></option>
                            <?php } ?>
                        </select>



                    </td>
                </tr>
                <tr>
                    <td>Upload Image:</td>
                    <td><input class="img" type="file" name="image">
                    </td>

                </tr>


            </table>
            <button type="submit" class="button">
                Create</button>
        </form>
    </div>
@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/createStyle.css') }}">

@stop
