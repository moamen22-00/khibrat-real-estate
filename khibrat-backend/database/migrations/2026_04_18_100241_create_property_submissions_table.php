<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('property_submissions', function (Blueprint $table) {
            $table->id();

            $table->string('lang')->default('ar');
            $table->string('ownership_type')->default('full');

            $table->string('name');
            $table->string('relation');
            $table->string('phone');
            $table->string('email');

            $table->string('property_area')->nullable();
            $table->string('property_number')->nullable();
            $table->text('property_description')->nullable();

            $table->decimal('total_area', 12, 2)->nullable();
            $table->decimal('total_area_shared', 12, 2)->nullable();
            $table->decimal('sold_area', 12, 2)->nullable();

            $table->json('owners')->nullable();

            $table->string('property_register')->nullable();
            $table->string('area_statement')->nullable();
            $table->string('survey_plan')->nullable();
            $table->string('contracts')->nullable();
            $table->json('other_attachments')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_submissions');
    }
};