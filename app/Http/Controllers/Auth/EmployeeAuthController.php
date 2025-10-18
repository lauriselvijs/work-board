<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginEmployeeRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeAuthController extends Controller
{
    public function __construct(private Inertia $inertia, private Hash $hash) {}

    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return $this->inertia::render('Auth/EmployeeLoginPage/index');
    }

    // destinee47@example.com
    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(LoginEmployeeRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        $request->session()->flash('message', __('Logged in'));

        return redirect()->intended('dashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        auth()->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('employee.login')->with('message', __('Logged out'));
    }

    public function confirm(): Response
    {
        return $this->inertia::render('Auth/EmployeeConfirmPage/index');
    }

    public function check(Request $request)
    {
        if (! $this->hash::check($request->password, $request->user()->password)) {
            return back()->withErrors([
                'password' => [__('The provided password does not match our records.')],
            ]);
        }

        $request->session()->passwordConfirmed();

        return redirect()->intended();
    }
}
