@extends('adminlte::page')
@section('content')
<div class="c-container">

    <div class="p-div">
        <div class="p-left">
    <h1 class= "heading">Edit Product Form </h1>

    <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="hidden" name="id" value="{{$product->id}}" />
        <table class="c-form">

            <tr>
                <td>Name</td>
                <td><input type="text" class="e-input" name="name" value="{{ $product->name }}"></td>
            </tr>
            <tr>
                <td>Slug</td>
                <td><input type="text" class="e-input" name="slug" value="{{ $product->slug }}"></td>
            </tr>
            <tr>
                <td>Detail</td>
                <td><textarea name="detail" class="e-input" cols="50" rows="4">{{ $product->detail }}</textarea></td>
            </tr>
            <tr>
                <td>Price</td>
                <td><input type="text" class="e-input" name="price" value="{{ $product->price }}"></td>
            </tr>
            <tr>
                <td>Weight</td>
                <td><input type="text" class="e-input" name="weight" value="{{ $product->weight }}"></td>
            </tr>
            <tr><td></td>
                <td>Do you want to fetured this iteam?</td>

            </tr>

            <tr>
                <td></td>
                <td>
                    <input type="checkbox"  name="featured" value ={{$product->featured}}  {{$product->featured ==1? 'checked' : '0'}}/>

            <tr>
            <tr>
                <td>Image</td>
                <td><input type="file" name="image"></td>

                {{-- <img src="{{ url('images/' . $products->image) }}" style="height:60px;width:60px" alt="logo"> --}}

            </tr>
            <tr>
                <td></td>
                <td><img src="{{ url('images/' . $product->image) }}" style="height:60px;width:60px" alt="logo"></td>

            </tr>

        </table>
        <button type="submit" class="button"> Update</button>
    </div>
        <div class="p-right">
            <div class="c-form1">
                <h3 class= "heading">Category</h3>
                @foreach ($categories as $category)
                    <input type="checkbox"  id={{ $category->name }} name="category[]"
                        value={{ $category->id }} @if(in_array($category->id, $selected_categories)) checked="checked" @endif>
                    <label>{{ $category->name }}</label><br>
                @endforeach



            </div>
        </div>



    </form>
@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/createStyle.css') }}">

@stop

