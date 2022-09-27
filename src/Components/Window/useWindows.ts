import { useCallback, useState } from 'react';

export function useWindows() {
    const [activeWindow, setActiveWindow] = useState('');
    const updateActiveWindow = useCallback((_, newId?: string) => {
        if (newId) {
            setActiveWindow(newId);
        }
    }, []);

    return (id: string) => ({
        id,
        isActive: id === activeWindow,
        onActive: updateActiveWindow,
    });
}
