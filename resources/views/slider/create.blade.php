@extends('adminlte::page')
@section('content')
    <div class="c-container">
        <h1 class="heading"> Add slider </h1>

        <form action="{{ route('admin.slider.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <table class="c-form">
                <tr>
                    <td>slider Name:</td>
                    <td><input type="text" name="name" class="input" required>
                    </td>
                </tr>

                <tr>
                    <td>slider detail:</td>
                    <td><input type="text" name="detail" class="input" required>
                    </td>
                </tr>

                <tr>
                    <td>Upload Image:</td>
                    <td><input class="img" type="file" name="image" required>
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
