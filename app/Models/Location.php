<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Country;


class Location extends Model
{
    use HasFactory;
                    // we can name any
    public function countries()
    {
        // to display name insted  of id       kun column ma chaiyeko country name tesko name
        return $this->belongsTo(Country::class,'country_id','id');
    }

}
