import { useQuasar } from "quasar";

export default function useNotify() {
    const $q = useQuasar();

    const notifySuccess = (message) => {
        $q.notify({ type: "positive", message: message });
    };

    const notifyError = (message) => {
        $q.notify({
            type: "negative",
            message: message
        });
    };

    const notifyWarning = (message) => {
        $q.notify({
            type: "warning",
            message: message
        });
    };

    const notifyInfo = (message) => {
        $q.notify({
            type: "info",
            message: message
        });
    };

    const notifyOngoing = (message) => {
        $q.notify({
            type: "ongoing",
            message: message
        });
    };

    return {
        notifyError,
        notifySuccess,
        notifyWarning,
        notifyInfo,
        notifyOngoing
    };
}
