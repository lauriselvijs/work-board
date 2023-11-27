import { router } from "@inertiajs/react";
import { useToggle } from "react-use";

export const useToggleSettings = (
    route: string,
    state: boolean
): [boolean, boolean, () => void] => {
    const [status, setStatus] = useToggle(state);
    const [disableButton, setDisableButton] = useToggle(false);

    const onToggle = () => {
        router.post(
            route,
            {},
            {
                onBefore: () => {
                    setStatus();
                    setDisableButton();
                },
                onError: () => setStatus(),
                onFinish: () => setDisableButton(),
            }
        );
    };

    return [disableButton, status, onToggle];
};
