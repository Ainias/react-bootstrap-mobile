import { useLayoutEffect } from "react";

export function useClientLayoutEffect(...params: Parameters<typeof useLayoutEffect>) {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line react-hooks/exhaustive-deps,react-hooks/rules-of-hooks
        useLayoutEffect(...params);
    }
}
