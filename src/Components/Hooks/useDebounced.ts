import { useCallback, useState } from 'react';

export function useDebounced<Args extends any[]>(
    callback: (...args: Args) => void | Promise<void>,
    dependencies: any[],
    delay = 100
) {
    const [shared] = useState({ timeout: undefined as undefined | any });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const realCB = useCallback(callback, dependencies);

    return useCallback(
        (...newArgs: Args) => {
            if (shared.timeout === undefined) {
                realCB(...newArgs);
                shared.timeout = setTimeout(() => (shared.timeout = undefined), delay);
            }
        },
        [delay, realCB, shared]
    );
}
