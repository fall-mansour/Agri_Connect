<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| ROUTE PUBLIQUE (LOGIN)
|--------------------------------------------------------------------------
*/
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| ROUTES PROTÉGÉES (AUTH SANCTUM)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // PROFIL UTILISATEUR
    Route::get('/profile', [ProfileController::class, 'show']);

    // MODIFIER PROFIL
    Route::put('/profile', [ProfileController::class, 'update']);

    // LOGOUT
    Route::post('/logout', [AuthController::class, 'logout']);
});