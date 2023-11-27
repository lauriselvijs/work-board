import { PageProps } from "@/types";
import { Employee as IEmployee } from "@/types/Employee";
import { Paginated } from "@/types/Components";

import FilterLayout from "@/layouts/FilterLayout";
import Employee from "@/components/Employee";
import { filterEmployeeBy, sortEmployeeBy } from "@/config/employee";

interface Employees extends Paginated {
    data: IEmployee[];
}

const EmployeesPage = ({
    employees: { data: employeeData, ...paginationData },
}: PageProps<{ employees: Employees }>) => {
    const renderEmployees = (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {employeeData.map((employee) => (
                <Employee key={employee.email} employee={employee} />
            ))}
        </div>
    );

    return (
        <main className="flex flex-col gap-8">
            <FilterLayout
                titleForFilterBy="role"
                filterBy={filterEmployeeBy}
                title="Employees"
                heading="Employees"
                children={renderEmployees}
                sortBy={sortEmployeeBy}
                paginationData={paginationData}
            />
        </main>
    );
};

export default EmployeesPage;
