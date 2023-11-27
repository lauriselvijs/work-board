<?php

use App\Enums\TaskStatus;
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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->uuid('task_id');
            $table->string('title');
            $table->text('description');
            $table->foreignId('assigned_by')->constrained('employees')->cascadeOnDelete();
            $table->foreignId('assigned_to')->nullable()->constrained('employees')->nullOnDelete();
            $table->dateTime('due_date')->nullable();
            $table->string('status')->default(TaskStatus::TODO->value);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
