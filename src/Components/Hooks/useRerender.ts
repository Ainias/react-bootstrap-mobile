import { useCallback, useRef, useState } from "react";

export function useRerender(defaultDelay = 0){
    const timeoutRef = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
    const [renderCounter, updateRenderCounter] = useState(0);
    const update = useCallback((delay = defaultDelay) => {
        if (delay === 0){
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
            updateRenderCounter(old => old + 1);
        } else if (!timeoutRef.current) {
            timeoutRef.current = setTimeout(() => {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = undefined;
                updateRenderCounter(old => old + 1);
            }, delay);
        }
    }, [defaultDelay]);

    return [update, renderCounter] as const;
}
