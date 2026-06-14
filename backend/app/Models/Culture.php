<?php

namespace App\Models;

// Remplace l'ancien use par celui-ci (c'est "Database\Eloquent\Model") :
use Illuminate\Database\Eloquent\Model;

class Culture extends Model
{
    protected $fillable = [
        'nom_producteur',
        'prenom_producteur',
        'localisation',
        'type_culture',
        'prix_kilo',
        'prix_hectare',
        'image_url',
        'description',
        'telephone'
    ];
}
