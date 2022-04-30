import { useCallback, useEffect, useState } from 'react';

export function useDelayed<Args extends any[]>(
    callback: (...args: Args) => void | Promise<void>,
    dependencies: any[],
    delay = 100
) {
    const [args, setArgs] = useState<Args | undefined>();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const realCB = useCallback(callback, dependencies);
    const func = useCallback((...newArgs: Args) => setArgs(newArgs), []);

    useEffect(() => {
        if (Array.isArray(args)) {
            const timeout = setTimeout(() => realCB(...args), delay);
            return () => clearTimeout(timeout);
        }
        return undefined;
    }, [args, realCB, delay]);

    return func;
}
