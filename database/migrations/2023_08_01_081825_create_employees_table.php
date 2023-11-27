<?php

use App\Enums\Role;
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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone_number')->unique();
            $table->string('phone_number_country');
            $table->uuid('username');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role')->default(Role::EMPLOYEE->value);
            $table->boolean('email_notification')->default(true);
            $table->boolean('push_notification')->default(true);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
