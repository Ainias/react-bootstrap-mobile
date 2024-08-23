import { createContext, useContext } from "react";

export const ToastContext = createContext<<Data>(text: string, action?: {name: string, onClick: (data?: Data) => void, onClickData?: Data }, duration?: number) => void>(() => {
    console.error("ToastContext not initialized");
});

export function useToast() {
    return useContext(ToastContext);
}
