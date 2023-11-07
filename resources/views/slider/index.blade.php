@extends('adminlte::page')

@section('content')

    @php

        $heads = ['S.N', 'Name', 'detail',  'Image', ['label' => 'Actions ', 'no-export' => true, 'width' => 15]];

    @endphp

    {{-- for alert display while deleting --}}
    @if(session()->get('success'))
    <div class="alert alert-success">
        {{ session()->get('success') }}
    </div>
    @endif
    @if(session()->get('danger'))
    <div class="alert alert-danger">
        {{ session()->get('danger') }}
    </div>
    @endif

    {{-- Minimal example / fill data using the component slot --}}
    <div class="main-container" >

    <x-adminlte-datatable id="table1" :heads="$heads" theme="danger">
        <!-- Displaying table on our dashboard (html page) -->
        {{-- <a class="btn btn-success my-3 " style="margin-right:20px"  href="{{ route('admin.users.create') }}"> Add Organization</a>
        <a class="btn btn-success my-3 " style="margin-right:20px"  href="{{ route('admin.staff_create') }}"> Add Organization Users</a> --}}




        <h1 class="main-heading" >Slider List</h1>
        <a href="{{route('admin.slider.create')}}" class="btn btn-xl btn-default mx-1 shadow bg-success my-3" title="Create">Add slider</a>

            {{-- compact name        storing slider data in sliderlist --}}
        @foreach ($slider as $sliderlist)
            <tr class="main-row">
                {{-- to display serial number --}}
                <td>{{ $loop->iteration }}</td>
                <td>{{ $sliderlist->name }}</td>
                <td>{{ $sliderlist->detail }}</td>
                <td><img src="{{ url("images/". $sliderlist->image) }}" style="height:50px;width:50px" alt="logo"></td>


                <td class="d-flex">
                    <span class="action-btn">

                        <a style="font-size:16px; margin-top:10px; margin-bottom:15px; "href="{{ route('admin.slider.edit', [$sliderlist->id]) }}"
                            class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                            <i class="fa fa-lg fa-fw fa-pen"></i> </a>
                    </span>



                    <form action="{{ route('admin.slider.destroy', [$sliderlist->id]) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button style="font-size:16px; margin-top:10px; margin-bottom:15px; " type="submit"
                            class="btn btn-xs btn-default text-danger mx-1 shadow" onclick="return confirm('Are you sure you want to delete this item?')"> <i class="fa fa-lg fa-fw fa-trash"></i>
                        </button>
                    </form>


                </td>



            </tr>
        @endforeach





    </x-adminlte-datatable>
</div>

@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/style.css') }}">

@stop
