import { useEffect, useRef } from 'react';

export function useOnMount(cb: () => void | Promise<void> | (() => any)) {
    const called = useRef(false);
    const unmountTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const unmountFunc = useRef<() => any | undefined>(undefined);
    useEffect(() => {
        clearTimeout(unmountTimeout.current);
        unmountTimeout.current = undefined;

        if (!called.current) {
            called.current = true;
            const returnVal = cb();
            if (typeof returnVal === 'function') {
                unmountFunc.current = returnVal;
            }
        }

        return () => {
            if (unmountTimeout.current) {
                return;
            }
            unmountTimeout.current = setTimeout(() => {
                unmountTimeout.current = undefined;
                unmountFunc.current?.();
            }, 60);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
