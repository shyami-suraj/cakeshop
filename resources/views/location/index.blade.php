@extends('adminlte::page')

@section('content')

    @php
   
        $heads = ['S.N', 'Country', 'City', ['label' => 'Actions ', 'no-export' => true, 'width' => 15]];
     
    @endphp
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

    <x-adminlte-datatable id="table1" :heads="$heads" theme="danger">
        <!-- Displaying table on our dashboard (html page) -->
        {{-- <a class="btn btn-success my-3 " style="margin-right:20px"  href="{{ route('admin.users.create') }}"> Add Organization</a>
        <a class="btn btn-success my-3 " style="margin-right:20px"  href="{{ route('admin.staff_create') }}"> Add Organization Users</a> --}}




        <h1 style="text-align: center;color:#ed1874;font-weight:bold; margin-top:25px;">Location List</h1>
        <a href="{{route('admin.location.create')}}"   class="btn btn-xl btn-default mx-1 shadow bg-success my-3" title="Create">Add Location</a>
        @foreach ($location as $locationlist)
            <tr style="background-color:#ed1874; color:white; font-size:22px;">
                <td>{{ $loop->iteration }}</td>
                {{-- location model ko func name = countries   country_name=>countries table ko cloumn name    --}}
                <td>{{ ($locationlist->countries != null) ?  $locationlist->countries->country_name:'' }}</td>
                <td>{{ $locationlist->city }}</td>



                <td class="d-flex">
                    <span class="action-btn">

                        <a style="font-size:16px " href="{{ route('admin.location.edit', [$locationlist->id]) }}"
                            class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit">
                            <i class="fa fa-lg fa-fw fa-pen"></i> </a>
                    </span>



                    <form action="{{ route('admin.location.destroy', [$locationlist->id]) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button style="font-size:16px" type="submit"
                            class="btn btn-xs btn-default text-danger mx-1 shadow" onclick="return confirm('Are you sure you want to delete this item?')"> <i class="fa fa-lg fa-fw fa-trash"></i>
                        </button>
                    </form>


                </td>



            </tr>
        @endforeach





    </x-adminlte-datatable>
    @endsection
    @section('css')
    <link rel="stylesheet" href="{{ url('/css/style.css') }}">

@stop

