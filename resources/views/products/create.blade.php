@extends('adminlte::page')
@section('content')
    <div class="c-container">

        <div class="p-div">
            <div class="p-left">
            <h1  class="heading">Add Products </h1>


            <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <table class="c-form">

                    <tr>
                        <td>Name:</td>
                        <td><input type="text" name="name" class="input" required> </td>
                    </tr>
                    <tr>
                        <td>Slug:</td>
                        <td><input type="text" name="slug" class="input" required></td>
                    </tr>
                    <tr>
                        <td>Detail:</td>
                        <td>
                            <textarea class="input" name="detail" cols="50" rows="4" required></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td><input type="text" class="input" name="price" placeholder="Rs." required></td>
                    </tr>
                    <tr>
                        <td>Weight:</td>
                        <td><input type="text" class="input" name="weight" required></td>
                    </tr>
                    <tr><td></td>
                        <td>Do you want to fetured this iteam?</td>

                    </tr>

                    <tr>
                        <td></td>
                        <td>
                            <input type="checkbox" name="featured" ></td>

                    <tr>
                        <td>Image:</td>
                        <td><input type="file" name="image"></td>
                    </tr>

                </table>
                <button type="submit" class="button"> Submit</button>
            </div>
                <div class="p-right">
                    <div class="c-form1">
                        <h3 class="heading">Category</h3>
                        @foreach ($categories as $category)
                            <input type="checkbox"  id={{ $category->name }} name="category[]"
                                value={{ $category->id }}>
                            <label>{{ $category->name }}</label><br>
                        @endforeach



                    </div>
                </div>

            </div>

        </form>
    </div>
@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/createStyle.css') }}">

@stop
