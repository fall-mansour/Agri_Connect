<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // --- INSCRIPTION ---
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
            'culture' => 'nullable|string|max:255',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'L\'ancien mot de passe est incorrect.'
            ], 401);
        }

        // 2. Insertion dans la base SQLite via le modèle User
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
            'message' => 'Mot de passe modifié avec succès.'
        ], 200);
    }

    // --- CONNEXION (TRAITEMENT REQUIS) ---
    public function login(Request $request)
    {
        // 1. Validation des identifiants saisis
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

        // 2. Recherche de l'utilisateur par son email via le modèle User
        $user = User::where('email', $request->email)->first();

        // 3. Vérification des identifiants (Existence + correspondance du mot de passe haché)
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email ou mot de passe incorrect.'
            ], 401); // 401 = Accès refusé
        }

        // 4. Si tout concorde, on renvoie le profil (sans le mot de passe pour la sécurité)
        return response()->json([
            'success' => true,
            'message' => 'Connexion réussie !',
            'user' => [
                'id' => $user->id,
                'prenom' => $user->prenom,
                'nom' => $user->nom,
                'email' => $user->email,
                'role' => $user->role, // Utilisé par Angular pour la redirection cible
            ],
            // Petit token fictif pour alimenter ton AuthService côté Angular
            'token' => 'agriconnect_session_' . bin2hex(random_bytes(32))
        ], 200);
    }
}
