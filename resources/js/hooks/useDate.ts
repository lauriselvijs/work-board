import dayjs, { Dayjs } from "dayjs";

// import "dayjs/locale/en";
// import "dayjs/locale/de";
// import "dayjs/locale/es";

import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

import { DEFAULT_DATE_FORMAT } from "@/config/date";
import { useBrowserLocal } from "./useBrowser";

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const useDate = () => {
    const local = useBrowserLocal();

    const toLocal = (date: string): Dayjs => {
        let localizedDate = dayjs(date).utc(true).local().locale(local);

        return localizedDate;
    };

    const toLocalFormat = (date: string): string => {
        let localizedDate = toLocal(date).format(DEFAULT_DATE_FORMAT);

        return localizedDate;
    };

    return { toLocal, toLocalFormat };
};
