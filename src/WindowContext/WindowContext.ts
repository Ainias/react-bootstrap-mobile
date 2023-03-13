import React, { useContext } from 'react';

export const WindowContext = React.createContext<Window | undefined>(undefined);
WindowContext.displayName = 'WindowContext';

export function useWindow() {
    return useContext(WindowContext) ?? (typeof window !== 'undefined' ? window : undefined);
}
