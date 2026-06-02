<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// 1. On importe ton contrôleur ici
use App\Http\Controllers\AuthController; 

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// 2. On ajoute ta route pour l'inscription de AgriConnect
Route::post('/register', [AuthController::class, 'register']);