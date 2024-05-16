<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;


class Dossier extends Model
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'dossier_medical';
    protected $fillable = [
        'patient_id',
        'medecin_id',
        'weight',
        'height',
        'gender',
        'city',
        'marital_status',
        'date_of_birth',
        'Antecedent_Familiaux',
        'Antecedent_Personelle',
        'family_history',
        'personal_history',
        'medications', // Add medications to fillable fields

    ];
        // protected $casts = [
        // 'family_history' => 'json',
        // 'personal_history' => 'json',
    // ];

    public function medecin()
    {
        return $this->belongsTo(User::class, 'medecin_id');
    }

    // Define relationship with patient (if needed)
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }
}
