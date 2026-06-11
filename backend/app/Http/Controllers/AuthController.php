<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function updatePassword(Request $request)
    {
        // Validation des données
        $request->validate([
            'ancien_mot_de_passe' => 'required',
            'nouveau_mot_de_passe' => 'required|min:8|confirmed',
        ]);

        $user = Auth::user();

        // Vérifier que l'ancien mot de passe est correct
        if (!Hash::check($request->ancien_mot_de_passe, $user->password)) {
            return response()->json([
                'message' => 'L\'ancien mot de passe est incorrect.'
            ], 401);
        }

        // Mettre à jour le mot de passe
        $user->update([
            'password' => Hash::make($request->nouveau_mot_de_passe)
        ]);

        return response()->json([
            'message' => 'Mot de passe modifié avec succès.'
        ], 200);
    }
}