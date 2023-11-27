import { ListboxOptionProps } from "@headlessui/react";
import { InertiaLinkProps } from "@inertiajs/react";
import { ElementType, InputHTMLAttributes } from "react";

export type Option<T = string | number> = { id: T; value: string | number };

export type OptionProps<T = any> = ListboxOptionProps<ElementType, Option<T>>[];

export type Navigation = {
    name: string;
    route: string;
} & InertiaLinkProps;

export type Input = InputHTMLAttributes<HTMLInputElement> &
    Partial<{ error: string; isFocused: boolean }>;

export type PhoneInput = string;

export interface Link {
    url: string;
    label: string;
    active: boolean;
}

export interface Paginated {
    per_page: number;
    total: number;
    current_page: number;
    from: number;
    to: number;
    links: Link[];
    next_page_url: string;
    prev_page_url: string;
}

export interface Flash {
    message?: string | null;
}
