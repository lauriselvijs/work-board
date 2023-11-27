import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Chart from "@/components/Chart";
import { IChartData } from "@/components/Chart/useChart";

const DashboardPage = ({
    chartData,
    totalData,
}: PageProps<{ chartData: IChartData; totalData: IChartData }>) => {
    return (
        <>
            <Head title="Dashboard" />
            <main className="flex flex-col gap-8 sm:gap-16">
                <div>
                    <h2 className="font-semibold text-center">Period</h2>
                    <div className="card">
                        <Chart data={chartData} entity="employees" />
                    </div>
                    <div className="card">
                        <Chart
                            data={chartData}
                            entity="tasks"
                            showSelect={false}
                        />
                    </div>
                </div>
                <div>
                    <h2 className="font-semibold text-center">Total</h2>
                    <div className="card">
                        <Chart
                            data={totalData}
                            entity="tasks"
                            showSelect={false}
                        />
                    </div>
                    <div className="card">
                        <Chart
                            data={totalData}
                            entity="employees"
                            showSelect={false}
                        />
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardPage;
