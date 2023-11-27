import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Colors,
} from "chart.js";
import tailwindConfig from "../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

ChartJS.register(
    Colors,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const fullConfig = resolveConfig(tailwindConfig);

ChartJS.defaults.font.size = 16;
ChartJS.defaults.font.family =
    typeof fullConfig.theme?.fontFamily!.sans[0] === "string"
        ? fullConfig.theme?.fontFamily!.sans[0]
        : undefined;
ChartJS.defaults.font.weight = fullConfig.theme?.fontWeight?.normal;
ChartJS.defaults.color =
    typeof fullConfig.theme?.colors?.dark === "string"
        ? fullConfig.theme?.colors?.dark
        : "black";

ChartJS.defaults.font.lineHeight = 1.5;

ChartJS.defaults.plugins.title.color =
    typeof fullConfig.theme?.colors?.dark === "string"
        ? fullConfig.theme?.colors?.dark
        : "black";
