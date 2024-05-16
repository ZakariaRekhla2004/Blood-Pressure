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
        Schema::create('activite', function (Blueprint $table) {
            $table->id();
            // $table->integer("id")->nullable();
            $table->decimal('Poids')->nullable();
            $table->decimal('Taille')->nullable();
            $table->decimal('Imc')->nullable();
            $table->date('date_Examen');
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
        Schema::dropIfExists('activite');
       
    }
    
};
