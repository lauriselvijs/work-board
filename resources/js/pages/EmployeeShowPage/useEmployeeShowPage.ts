import { useState } from "react";

export const useEmployeeShowPage = () => {
    const [processing, setProcessing] = useState(false);

    const onProcessing = () => {
        setProcessing((prev) => !prev);
    };

    return { processing, onProcessing };
};
