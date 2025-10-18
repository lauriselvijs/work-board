<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Services\Employee\EmployeeService;
use App\Services\Task\TaskQueryParamsValidation;
use App\Services\Task\TaskService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function __construct(
        private Inertia $inertia,
        private EmployeeService $employeeService,
        private TaskService $taskService,
        private TaskQueryParamsValidation $taskQueryParamsValidation
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $employees = $this->employeeService
            ->filter(
                $request->extractQueryParams()
            );

        return $this->inertia::render('EmployeesPage/index', ['employees' => $employees]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return $this->inertia::render('EmployeeCreatePage/index');
    }

    /**
     * Attempt to store the employee.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StoreEmployeeRequest $request): RedirectResponse
    {
        $this->employeeService->store($request->safe());

        return redirect()->route('dashboard')->with('message', __('Profile created'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee): Response
    {
        $this->authorize('view', $employee);

        return $this->inertia::render('EmployeeShowPage/index', ['employee' => $employee]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee): Response
    {
        $this->authorize('update', $employee);

        return $this->inertia::render('EmployeeEditPage/index', ['employee' => $employee]);
    }

    /**
     * Attempt to update the employees data.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee): RedirectResponse
    {
        $this->employeeService->update($request->safe(), $employee);

        return redirect()->back()->with('message', __('Profile updated'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee): RedirectResponse
    {
        $this->employeeService->destroy($employee);

        return redirect()->route('employee.login')->with('message', __('Profile deleted'));
    }

    public function tasks(Employee $employee, Request $request): Response
    {
        $tasks = $this->taskService
            ->filter(
                $employee,
                $request->extractQueryParams(),
                $request->query($this->taskQueryParamsValidation::ASSIGNEES_FILTER_KEY)
            );

        return $this->inertia::render('EmployeeTaskPage/index', ['tasks' => $tasks, 'employee' => $employee]);
    }

    public function togglePushNotifications(): RedirectResponse
    {
        $this->employeeService->togglePushNotifications();

        return back()->with('message', __('Status updated'));
    }

    public function toggleEmailNotifications(): RedirectResponse
    {
        $this->employeeService->toggleEmailNotifications();

        return back()->with('message', __('Status updated'));
    }
}
