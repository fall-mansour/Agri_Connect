<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // 1. Validation des données reçues d'Angular
        $validator = Validator::make($request->all(), [
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'telephone' => 'required|string|max:50',
            'adresse' => 'required|string|max:255',
            'role' => 'required|string|in:agriculteur,acheteur,gestionnaire,mediateur',
            'culture' => 'nullable|string|max:255', // Optionnel (seulement pour l'agriculteur)
            'password' => 'required|string|min:6|confirmed', // Vérifie aussi le champ password_confirmation
        ]);

        // Si la validation échoue, on renvoie les erreurs à Angular
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Insertion dans la base SQLite via le modèle User
        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
            'role' => $request->role,
            // Si ce n'est pas un agriculteur, on force la culture à null
            'culture' => $request->role === 'agriculteur' ? $request->culture : null,
            'password' => $request->password, // Haché automatiquement par le modèle !
        ]);

        // 3. Réponse de succès renvoyée à Angular
        return response()->json([
            'success' => true,
            'message' => 'Compte créé avec succès !',
            'user' => $user
        ], 201);
    }
}
