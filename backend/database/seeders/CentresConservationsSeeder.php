<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CentresConservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gestionnaire = DB::table('utilisateurs')->first();

        // Optionnel mais propre : on nettoie la table avant de seed
        DB::table('centres_conservations')->truncate();

        DB::table('centres_conservations')->insert([
            [
                'nom_centre' => 'Centre de Stockage de Pout',
                'localisation' => 'Pout, Région de Thiès',
                'capacite' => 50,
                'etat' => 'disponible',
                'utilisateur_id' => $gestionnaire ? $gestionnaire->id : null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom_centre' => 'Entrepôt Frigorifique de Sangalkam',
                'localisation' => 'Sangalkam, Rufisque',
                'capacite' => 30,
                'etat' => 'réservé',
                'utilisateur_id' => $gestionnaire ? $gestionnaire->id : null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom_centre' => 'Complexe de Conservation de Ndioum',
                'localisation' => 'Ndioum, Saint-Louis',
                'capacite' => 120,
                'etat' => 'disponible',
                'utilisateur_id' => $gestionnaire ? $gestionnaire->id : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
