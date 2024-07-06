import { useCallback, useRef } from 'react';

export function useDelayed<Args extends any[]>(
    callback: (...args: Args) => void | Promise<void>,
    dependencies: any[],
    delay = 100,
    maxDelay: number|undefined = undefined
) {
    const argsRef = useRef<Args | undefined>(undefined);
    const timeoutRef = useRef<any>(undefined);
    const mayDelayTimeoutRef = useRef<any>(undefined);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const realCB = useCallback(callback, dependencies);
    const func = useCallback(
        (...newArgs: Args) => {
            argsRef.current = newArgs;

            const triggerFunc = () => {
                clearTimeout(mayDelayTimeoutRef.current);
                clearTimeout(timeoutRef.current);
                timeoutRef.current = undefined;
                maxDelayTimeout.current = undefined;

                if (argsRef.current !== undefined) {
                    realCB(...argsRef.current);
                }
            };

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(triggerFunc, delay);

            if (maxDelay && maxDelayTimeout.current === undefined) {
                maxDelayTimeout.current = setTimeout(() => {
                    triggerFunc();
                }, maxDelay);
            }
        },
        [delay, maxDelay, realCB]
    );
    const maxDelayTimeout = useRef<any>();

    return func;
}
