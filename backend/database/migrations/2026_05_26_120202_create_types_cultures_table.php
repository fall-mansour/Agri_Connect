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
        Schema::create('types_cultures', function (Blueprint $table) {

            $table->id();
    // Clé étrangère qui pointe vers l'agriculteur (dans la table users)
            $table->foreignId('utilisateur_id')->constrained()->onDelete('cascade');
            $table->string('nom_culture'); // ex: Oignons, Riz, Mangues
            $table->integer('prix_kilo');
            $table->integer('prix_hectare');
            $table->string('image_url')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('types_cultures');
    }
};
