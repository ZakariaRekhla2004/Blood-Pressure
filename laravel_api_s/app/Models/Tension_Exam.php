<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


class Tension_Exam extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'Systolique',
        'Diastolique',
        'date_Examen',
        'heure_Examen'
    ];
}
