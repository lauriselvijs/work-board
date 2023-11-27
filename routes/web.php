<?php

use App\Http\Controllers\Auth\EmployeeAuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::middleware(['throttle:global'])->group(function () {

// Guest routes for employees (accessible to unauthenticated users)
Route::group(['middleware' => ['guest', HandlePrecognitiveRequests::class]], function () {
    Route::group(['prefix' => 'employee', 'as' => 'employee.'], function () {
        Route::get('/login', [EmployeeAuthController::class, 'create'])->name('login');
        Route::post('/login', [EmployeeAuthController::class, 'store'])->name('login.store')->withoutMiddleware(HandlePrecognitiveRequests::class);
    });

    Route::resource('employees', EmployeeController::class)->only(['create', 'store']);
});

// Authenticated routes for employees (accessible to authenticated users)
Route::group(['middleware' => ['auth']], function () {
    Route::get('/', DashboardController::class)->name('dashboard');

    Route::group(['prefix' => 'employee'], function () {
        Route::group(['as' => 'employee.'], function () {
            Route::post('/toggle-push-notification', [EmployeeController::class, 'togglePushNotifications'])->name('togglePushNotifications');
            Route::post('/toggle-email-notifications', [EmployeeController::class, 'toggleEmailNotifications'])->name('toggleEmailNotifications');
            Route::post('/logout', [EmployeeAuthController::class, 'destroy'])->name('logout');
        });

        Route::get('/confirm-password', [EmployeeAuthController::class, 'confirm'])->name('password.confirm');
        Route::post('/confirm-password', [EmployeeAuthController::class, 'check'])->name('password.check')->middleware('throttle:6,1');
    });

    Route::resource('employees', EmployeeController::class)->except(['create', 'store', 'destroy'])->middleware(HandlePrecognitiveRequests::class);
    Route::group(['prefix' => 'employees'], function () {
        Route::delete('/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy')->middleware('password.confirm');
        Route::get('/{employee}/tasks', [EmployeeController::class, 'tasks'])->name('employee.tasks');
    });

    Route::resource('tasks', TaskController::class)->only(['store', 'update', 'destroy'])->middleware(HandlePrecognitiveRequests::class);
});
// });
