<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'project_id',
        'assigned_to',
        'assigned_by',
        'due_date',
        'status',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'due_date' => 'datetime',
    ];

    /**
     * The relationships that should always be loaded
     */
    protected $with = ['assignedByEmployee:id,name,username', 'assignedToEmployee:id,name,username'];

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->toDateTimeLocalString();
    }

    public function assignedByEmployee()
    {
        return $this->belongsTo(Employee::class, 'assigned_by');
    }

    public function assignedToEmployee()
    {
        return $this->belongsTo(Employee::class, 'assigned_to');
    }
}
