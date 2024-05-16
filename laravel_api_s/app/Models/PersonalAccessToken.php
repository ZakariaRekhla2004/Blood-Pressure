<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


class PersonalAccessToken extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';


       protected $fillable = [
        'tokenable_id',
        'tokenable_type',
        'name',
        'token',
        'abilities',
        'last_used_at',
        'expires_at',
    ];

}