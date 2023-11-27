<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Collection;

class Helper
{
    public static function getMonthNames(): Collection
    {
        $monthNames = [];

        for ($i = 1; $i <= 12; $i++) {
            $carbonDate = Carbon::create()->month($i);
            $monthNames[$i] = $carbonDate->monthName;
        }

        return collect($monthNames);
    }
}
