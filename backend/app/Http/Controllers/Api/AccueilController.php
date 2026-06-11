<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Culture;
use Illuminate\Http\JsonResponse;

class AccueilController extends Controller
{
    /**
     * Récupère toutes les cultures pour la page d'accueil.
     */
    public function index(): JsonResponse
    {
        // On récupère toutes les cultures de la base SQLite et on les renvoie en JSON
        return response()->json(Culture::all());
    }
}
