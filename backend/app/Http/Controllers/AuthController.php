<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // --- INSCRIPTION ---
    public function register(Request $request)
    {
        // 1. Validation alignée sur la table 'utilisateurs'
        $validator = Validator::make($request->all(), [
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs,email', // <-- CORRIGÉ : unique sur utilisateurs
            'telephone' => 'required|string|max:50',
            'adresse' => 'required|string|max:255',
            'role' => 'required|string|in:agriculteur,acheteur,gestionnaire,mediateur',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

<<<<<<< HEAD
        // 2. Insertion dans la base SQLite via le modèle User
=======
        // 2. Insertion via le modèle User (qui pointe vers 'utilisateurs')
>>>>>>> feat: mises à jour auth backend et routes
        $user = User::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'adresse' => $request->adresse,
<<<<<<< HEAD
            'role' => $request->role,
            'culture' => $request->role === 'agriculteur' ? $request->culture : null,
            'password' => $request->password,
=======
            'statut' => $request->role, // <-- CORRIGÉ : On map 'role' vers la colonne 'statut'
            'password' => $request->password, // Sera haché automatiquement via le cast du modèle
>>>>>>> feat: mises à jour auth backend et routes
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Compte créé avec succès !',
            'user' => $user
        ], 201);
    }

    // --- CONNEXION ---
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Recherche dans la table 'utilisateurs' via le modèle User
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email ou mot de passe incorrect.'
            ], 401);
        }

        // Renvoi de la réponse en remappant 'statut' en 'role' pour Angular
        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie !',
            'user' => [
                'id' => $user->id,
                'prenom' => $user->prenom,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->statut, // <-- CORRIGÉ : On renvoie 'role' pour ne pas casser la redirection Angular
            ],
            'token' => 'agriconnect_session_' . bin2hex(random_bytes(32))
        ], 200);
    }
}
