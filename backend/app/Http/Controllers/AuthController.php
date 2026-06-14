<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // INSCRIPTION
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'telephone' => 'required|string|max:50',
            'adresse' => 'required|string|max:255',
            'role' => 'required|string|in:agriculteur,acheteur,gestionnaire,mediateur',
            'culture' => 'nullable|string|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'role' => $request->role,
            'culture' => $request->role === 'agriculteur' ? $request->culture : null,
            'password' => $request->password,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Compte créé avec succès !',
            'user' => $user
        ], 201);
    }

    // CHANGEMENT MOT DE PASSE
    public function updatePassword(Request $request)
    {
        $request->validate([
            'ancien_mot_de_passe' => 'required',
            'nouveau_mot_de_passe' => 'required|min:8|confirmed',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->ancien_mot_de_passe, $user->password)) {
            return response()->json([
                'message' => 'L\'ancien mot de passe est incorrect.'
            ], 401);
        }

        $user->update([
            'password' => Hash::make($request->nouveau_mot_de_passe)
        ]);

        return response()->json([
            'message' => 'Mot de passe modifié avec succès.'
        ], 200);
    }
}