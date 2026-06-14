<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller; // <-- AJOUTE CETTE LIGNE D'IMPORTATION !

class CentreConservationController extends Controller
{
    public function index()
    {
        // On récupère tous les centres de la base de données
        $centres = DB::table('centres_conservations')->get();

        return response()->json($centres);
    }
}
