<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Collection;
use Laravel\Scout\Searchable;
use Propaganistas\LaravelPhone\Casts\E164PhoneNumberCast;

class Employee extends Authenticatable
{
    use HasFactory, Notifiable, Searchable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'role',
        'phone_number_country',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'phone_number' => E164PhoneNumberCast::class,
    ];

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'phone_number' => $this->phone_number,
        ];
    }

    protected function serializeDate(DateTimeInterface $date): string
    {
        return $date->toDateTimeLocalString();
    }

    public function getRouteKeyName(): string
    {
        return 'username';
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'assigned_by');
    }

    public function tasksAssignedTo()
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }

    public static function getEmployeeYears(): Collection
    {
        return self::selectRaw('YEAR(created_at) AS year')
            ->distinct()
            ->orderBy('year')
            ->pluck('year');
    }

    /**
     * The channels the user receives notification broadcasts on.
     */
    public function receivesBroadcastNotificationsOn(): string
    {
        return 'employees.'.$this->id;
    }
}
