import { useEffect } from "react";

export function useDelayedEffect(effect: () => (() => void|void), dependencies: any[], delay = 100){
    useEffect(() => {
        let cleanup: (() => void|void) | undefined;
        let timeout = setTimeout(() => {
            cleanup = effect();
        }, delay);
        return () => {
            clearTimeout(timeout);
            cleanup?.()
        };
    }, dependencies);
}
