@extends('adminlte::page')

@section('content')

    @php
    $heads = [
        'S.N.',
        'Name',
        'image',
        'Slug',
        'Categories',
        'Price',
        'Weight',
        ['label' => 'Actions', 'no-export' => true, 'width' => 15],
    ];


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


<x-adminlte-datatable id="table1" :heads="$heads" theme="danger">

    <h1 class="main-head">Product List</h1>

    <a class="btn btn-xl btn-default mx-1 shadow bg-success my-3" title="Create" href="{{ route('admin.products.create') }}"> Add Products</a>


            @foreach ($product as $products)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $products->name }}</td>
                <td><img src="{{ url("images/". $products->image) }}" style="height:60px;width:60px" alt="logo"></td>
                <td>{{ $products->slug }}</td>
                <td>

                    @foreach($products->categories as $cat)

                    {{$cat->name}},
                @endforeach</td>
                <td>Rs.{{ $products->price }}</td>
                <td>{{ $products->weight }}</td>




                <td class="d-flex" ><a  style="font-size:16px "class="btn btn-xs btn-default text-primary mx-1 shadow" title="Edit" href="{{ route('admin.products.edit', [$products->id]) }}"><i class="fa fa-lg fa-fw fa-pen"></i></a>
                    <form action="{{ route('admin.products.destroy', [$products->id]) }}" method="POST">
                        @csrf

                        @method('DELETE')

                        <button style="font-size:16px"  type="submit"  class="btn btn-xs btn-default text-danger mx-1 shadow" onclick="return confirm('Are you sure you want to delete this item?')" ><i class="fa fa-lg fa-fw fa-trash"></i></button>
                    </form>

            </tr>
        @endforeach
    </x-adminlte-datatable>


@endsection
@section('css')
    <link rel="stylesheet" href="{{ url('/css/style.css') }}">

@stop
