<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CentreConservationController;



// 1. On importe tes contrôleurs ici (C'est l'import de AccueilController qui manquait !)
use App\Http\Controllers\AuthController;

// 2. On ajoute tes routes pour AgriConnect
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cultures', [AccueilController::class, 'index']);
Route::get('/centres', [CentreConservationController::class, 'index']);
