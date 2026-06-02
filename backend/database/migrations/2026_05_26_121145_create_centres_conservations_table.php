<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('centres_conservations', function (Blueprint $table) {
            $table->id();


            $table->string('nom_centre');
            $table->string('localisation');

            // Capacité en tonnes ou en kilogrammes (ex: 50 pour 50 Tonnes)
            $table->integer('capacite');

            // État du centre : disponible ou réservé
            $table->enum('etat', ['disponible', 'réservé'])->default('disponible');

            $table->foreignId('utilisateur_id')
                  ->nullable()
                  ->constrained('utilisateurs')
                  ->onDelete('set null');

            // Génère automatiquement les champs created_at et updated_at (currenttimestamp)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('centres_conservations');
    }
};
