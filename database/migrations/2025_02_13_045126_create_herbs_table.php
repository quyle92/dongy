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
        Schema::create('herbs', function (Blueprint $table) {
            $table->id();
            $table->string("name_vn", 40);
            $table->string("name_zh", 40);
            $table->json("properties");
            $table->json("meridians");
            $table->text("indication");
            $table->text("caution");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('herbs');
    }
};
