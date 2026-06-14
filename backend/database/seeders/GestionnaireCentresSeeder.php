<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GestionnaireCentresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

    // On nettoie la table des utilisateurs pour repartir à zéro (uniquement si tu n'as pas d'autres utilisateurs importants)
        DB::table('utilisateurs')->truncate();

        DB::table('utilisateurs')->insert([
            [
                'id' => 1,
                'nom' => 'Fall',
                'prenom' => 'Ibrahima',
                'email' => 'ibrahima@agriconnect.sn',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'nom' => 'Diop',
                'prenom' => 'Awa',
                'email' => 'awa@agriconnect.sn',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'nom' => 'Ndiaye',
                'prenom' => 'Modou',
                'email' => 'modou@agriconnect.sn',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
        //
    }
}
