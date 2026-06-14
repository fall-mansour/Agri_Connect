<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CentreConservationController;



// 1. On importe tes contrôleurs ici (C'est l'import de AccueilController qui manquait !)
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\AccueilController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// 2. On ajoute tes routes pour AgriConnect
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cultures', [AccueilController::class, 'index']);
Route::get('/centres', [CentreConservationController::class, 'index']);
