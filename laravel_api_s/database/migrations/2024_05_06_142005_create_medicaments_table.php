<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('medicaments', function (Blueprint $table) {
             $table->id();
            $table->integer("id");
            $table->string('Nom');
            $table->string('doze')->nullable();
            $table->integer('Mg_g');
            $table->string('Qr');
            $table->json('Temps')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('medicaments');
    }
};
