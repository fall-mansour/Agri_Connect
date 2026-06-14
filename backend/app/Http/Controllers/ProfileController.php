<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    // AFFICHER PROFIL
    public function show(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()
        ]);
    }

    // METTRE À JOUR PROFIL
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'nom'       => 'required|string|max:255',
            'prenom'    => 'required|string|max:255',
            'adresse'   => 'required|string|max:255',
            'telephone' => [
                'required',
                'string',
                'max:20',
                Rule::unique('utilisateurs', 'telephone')->ignore($user->id),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('utilisateurs', 'email')->ignore($user->id),
            ],
            'statut' => 'required|string',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $user->nom = $validated['nom'];
        $user->prenom = $validated['prenom'];
        $user->adresse = $validated['adresse'];
        $user->telephone = $validated['telephone'];
        $user->email = $validated['email'];
        $user->statut = $validated['statut'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Profil mis à jour avec succès',
            'user' => $user
        ]);
    }
}