import { useCallback, useEffect, useRef, useState } from 'react';

export function useDelayed<Args extends any[]>(
    callback: (...args: Args) => void | Promise<void>,
    dependencies: any[],
    delay = 100,
    maxDelay?: number
) {
    const [args, setArgs] = useState<Args | undefined>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const realCB = useCallback(callback, dependencies);
    const func = useCallback((...newArgs: Args) => setArgs(newArgs), []);
    const maxDelayTimeout = useRef<any>();

    useEffect(() => {
        if (Array.isArray(args)) {
            const triggerFunc = () => {
                clearTimeout(maxDelayTimeout.current);
                maxDelayTimeout.current = undefined;
                realCB(...args);
            };
            const timeout = setTimeout(triggerFunc, delay);

            if (maxDelay && maxDelayTimeout.current === undefined) {
                maxDelayTimeout.current = setTimeout(() => {
                    triggerFunc();
                    clearTimeout(timeout);
                }, maxDelay);
            }
            return () => clearTimeout(timeout);
        }
        return undefined;
    }, [args, realCB, delay, maxDelay]);

    return func;
}
