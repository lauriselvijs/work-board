import { Line, Pie } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";
import "@/config/chart";
import Select from "../Select";
import { IChartData, useChart } from "./useChart";
import { Entity } from "@/types/Entity";
import { ucFirst } from "@/utils/string";

const Chart = ({
    data,
    entity,
    showSelect = true,
}: {
    data: IChartData;
    entity: Entity;
    showSelect?: boolean;
}) => {
    const { onYearChange, isLoading, year, pieData, years, lineData } =
        useChart(data, entity);

    const options: ChartOptions<"line"> = {
        interaction: {
            intersect: false,
            mode: "index",
        },
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                position: "average",
            },
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `New ${ucFirst(entity)} per Period`,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: ucFirst(entity),
                },
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    tickBorderDashOffset: 20,
                },
                min: 0,
            },
            x: {
                title: {
                    display: true,
                    text: "Period",
                },
            },
        },
    };

    const pieOptions: ChartOptions<"pie"> = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `Total ${entity}`,
            },
        },
    };

    const renderSelect = showSelect && years && year && (
        <Select
            optionList={years}
            listbox={{
                className: "w-full md:w-fit",
                disabled: isLoading,
                value: year,
                name: "year",
                onChange: onYearChange,
            }}
            button={{
                className: "mt-1 md:min-w-[200px] w-full",
            }}
            labelChildren={"Year"}
            buttonChildren={year.value}
        />
    );

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="lg:w-3/4 w-full">
                {renderSelect}
                <div className="relative h-[60vh]">
                    <Line options={options} data={lineData} />
                </div>
            </div>
            <div className="relative h-[40vh] w-full lg:w-1/4">
                <Pie options={pieOptions} data={pieData} />
            </div>
        </div>
    );
};

export default Chart;
