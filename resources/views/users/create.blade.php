@extends('adminlte::page')
@section('content')
    <div class="c-container">
        <h1 class="heading"> Add Users </h1>

        <form action="{{ route('admin.users.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <table class="c-form">
                <tr>
                    <td>Name:</td>
                    <td><input type="text" name="name" class="input">
                    </td>
                </tr>

                <tr>
                    <td>Phone:</td>
                    <td><input type="text" name="phone" class="input">
                    </td>
                </tr>

                <tr>
                    <td>Email:</td>
                    <td><input type="email" name="email" class="input">
                    </td>
                        
                </tr>
                <tr>
                    <td>User Type:</td>
                    <td>
                        <select class="select" name="user_type">
                            <option >Select</option>
                            <option>admin</option>
                            <option>user</option>

                        </select>



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
