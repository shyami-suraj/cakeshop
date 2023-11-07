@extends('adminlte::page')
@section('content')
<div class= "container"  >

    <h1 class= "head" > Edit Categories </h1>

    <form action="{{ route('admin.category.store', [$category->id]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="id" value="{{$id}}"/>

        <table class="e-table" >
            {{-- <div class="input-box">
            <input type="hidden" name="id" value="{{$category['id']}}"
                style="padding: 10px; margin-top: 42px; margin-left: -68px;" />
        </div> --}}
            <tr>
                <td>Category Name:</td>
                <td><input class="e-input" type="text" name="name" value="{{ $category['name'] }}" ></td>
            </tr>

            <tr>
                <td>Category Slug:</td>
                <td><input class="e-input" type="text" name="slug" value="{{ $category['slug'] }}" ></td>
            </tr>

            <tr>
                <td>Parent Category:</td>
                <td>
                    <select class="e-input" name="parent_id" id="category" >
                        <option value=0>Select</option>
                        <?php
                    foreach ($categories as $category_id => $category_name) {
                    ?>
                        <option value="<?php echo $category_id?>" @if($category['parent_id']==$category_id)
                            {{'selected=selected'}} @endif> <?php echo $category_name; ?></option>
                        <?php } ?>
                    </select>
                </td>
            </tr>
            <tr>
                <td>Upload Image:</td>

                <td><input class="file-upload-input" type="file" name ="image"  ></td>
            </tr>
            <tr>
                <td></td>
                <td><img src="{{ url("images/". $category->image) }}" style="height:60px;width:60px" alt="logo"></td>

            </tr>


        </table>
        <button type="submit" value="" class="e-button"> Update</button>
        {{-- </form> --}}
</div>
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/editStyle.css') }}">

@stop
