import { useEffect, useRef } from 'react';

export function useOnce(cb: () => void | Promise<void>, condition: boolean) {
    const called = useRef(false);
    useEffect(() => {
        if (!called.current && condition) {
            called.current = true;
            cb();
        }
    });
}
