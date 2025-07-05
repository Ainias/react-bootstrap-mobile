import { ForwardedRef, useCallback } from 'react';

export function useComposedRef<RefVal>(...refs: (ForwardedRef<RefVal> | undefined)[]) {
    return useCallback((val: RefVal | null) => {
        for (const ref of refs) {
            if (typeof ref === 'function') {
                ref(val);
            } else if (ref) {
                ref.current = val;
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}
