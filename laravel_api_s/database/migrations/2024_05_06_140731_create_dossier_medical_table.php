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
        Schema::create('dossier_medical', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("patient_id");
            $table->decimal('weight');
            $table->decimal('height');
            $table->string('gender');
            $table->string('city');
            $table->string('marital_status');
            $table->date('date_of_birth');
            $table->json('family_history')->nullable();
            $table->json('medications')->nullable(); // Store medication information
            $table->unsignedBigInteger('medecin_id')->nullable(); // Add medecin_id column
            $table->foreign('medecin_id')->references('id')->on('users'); // Add foreign key constraint
           $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    // public function down()
    // {
    //     Schema::dropIfExists('dossier_medical');
    // }
    public function down()
{
    Schema::table('dossier_medical', function (Blueprint $table) {
        $table->dropForeign(['medecin_id']); // Drop the foreign key constraint
        $table->dropColumn('medecin_id'); // Drop the medecin_id column
    });
}
};
