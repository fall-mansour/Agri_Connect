
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
        Schema::create('cultures', function (Blueprint $table) {
            $table->id();
            $table->string('type_culture'); // ex: Riz, Cannes à sucre, Oignons
            $table->string('nom_producteur'); // ex: Sow, Diop
            $table->string('prenom_producteur'); // ex: Moussa, Fatou
            $table->string('localisation'); // ex: Saint-Louis, Sénégal
            $table->integer('prix_kilo'); // ex: 450
            $table->integer('prix_hectare'); // ex: 300000
            $table->text('image_url'); // text plutôt que string pour supporter les longues chaînes Base64
            $table->text('description')->nullable();
            $table->string('telephone')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cultures');
    }
};
