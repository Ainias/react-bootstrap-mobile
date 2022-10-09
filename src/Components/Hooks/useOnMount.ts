import { useEffect, useRef } from 'react';

export function useOnMount(cb: () => void | Promise<void>) {
    const called = useRef(false);
    useEffect(() => {
        if (!called.current) {
            called.current = true;
            cb();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
