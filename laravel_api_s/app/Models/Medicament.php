<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


class Medicament extends Model
{
    use HasFactory;
    protected $fillable = ['id',  'Nom', 'doze', 'Mg_g', 'Qr', 'Temps'];
    protected $connection = 'mongodb';
    protected $collection = 'medicaments';
}
