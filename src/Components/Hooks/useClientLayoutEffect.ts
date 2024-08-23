import React from "react";

export function useClientLayoutEffect(...params: Parameters<typeof React.useLayoutEffect>) {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line react-hooks/exhaustive-deps,react-hooks/rules-of-hooks
        React.useLayoutEffect(...params);
    }
}
