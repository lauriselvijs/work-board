import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import headlessui from "@headlessui/tailwindcss";
import colors from "tailwindcss/colors";

const lilac = {
    50: "#f9f6f8",
    100: "#f5eef3",
    200: "#eddde8",
    300: "#dfc2d6",
    400: "#d2aac4",
    500: "#B8538E",
    600: "#a16185",
    700: "#894d6e",
    800: "#72425b",
    900: "#613a4f",
    950: "#391e2c",
};

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],
    theme: {
        extend: {
            padding: {
                xs: "1%",
                sm: "3%",
                md: "6%",
                lg: "12%",
            },
            margin: {
                xs: "1%",
                sm: "3%",
                md: "6%",
                lg: "12%",
            },
            gap: {
                xs: "1%",
                sm: "3%",
                md: "6%",
                lg: "12%",
            },
        },
        fontFamily: {
            sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        },
        colors: {
            dark: colors.black,
            light: colors.white,
            transparent: "transparent",
            current: "currentColor",
            "primary-very-light": lilac[50],
            "primary-light": lilac[200],
            primary: lilac[500],
            "primary-dark": lilac[800],
            "primary-very-dark": lilac[950],
            error: colors.red[600],
        },
    },

    plugins: [forms, headlessui],
    future: {
        hoverOnlyWhenSupported: true,
    },
};
