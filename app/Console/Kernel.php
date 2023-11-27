<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // Remove failed jobs from DB every month
        $schedule->command('queue:prune-failed')->name('queue:prune-failed')
            ->monthly()
            ->appendOutputTo(storage_path('/logs/deleted_failed_jobs.log'))
            ->onOneServer()
            ->runInBackground();

        $schedule->command('horizon:snapshot')->name('horizon:snapshot')
            ->everyFiveMinutes()
            ->onOneServer()
            ->runInBackground();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
