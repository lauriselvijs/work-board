import { useSetQueryParam } from "@/hooks/useQueryParam";
import { Option, OptionProps } from "@/types/Components";
import { Entity } from "@/types/Entity";
import { ChartData } from "chart.js";
import { useState } from "react";

const QUERY_YEAR_KEY = "year";

interface Data {
    [key: string]: number;
}

interface Dataset {
    datasets: { label: string; data: Data }[];
    period_total: Data;
}

export interface IChartData {
    years?: OptionProps<number>;
    year?: Option<number>;
    data: Record<Entity, Dataset>;
}

export const useChart = (chartData: IChartData, entity: Entity) => {
    const data: ChartData<"line", Data> = {
        datasets: chartData.data[entity].datasets,
    };

    const pieData: ChartData<"pie"> = {
        labels: Object.keys(chartData.data[entity].period_total),
        datasets: [
            {
                label: "Total",
                data: Object.values(chartData.data[entity].period_total),
            },
        ],
    };

    const [year, setYear] = useState<Option<number> | null>(
        chartData.year || null
    );
    const { isLoading, setQueryParam } = useSetQueryParam();

    const onYearChange = (value: Option<number>) => {
        setQueryParam(QUERY_YEAR_KEY, value.id, () => {
            setYear(value);
        });
    };

    // const chartRef = useRef(null);

    // const printElementAtEvent = (element: InteractionItem[]) => {
    //     if (!element.length) return;

    //     const { datasetIndex, index } = element[0];

    //     console.log(
    //         data.datasets[datasetIndex].label,
    //         Object.keys(data.datasets[datasetIndex].data)[index],
    //         Object.values(data.datasets[datasetIndex].data)[index]
    //     );
    // };

    // const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    //     const { current: chart } = chartRef;

    //     if (!chart) {
    //         return;
    //     }

    //     printElementAtEvent(getElementAtEvent(chart, event));
    // };

    return {
        onYearChange,
        isLoading,
        year,
        pieData,
        lineData: data,
        years: chartData.years,
    };
};
