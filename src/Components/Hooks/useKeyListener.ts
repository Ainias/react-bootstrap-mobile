import { useEffect } from 'react';

export function useKeyListener(
    key: KeyboardEvent['key'],
    listener: (e: KeyboardEvent) => void,
    dependencies: any[] = []
) {
    useEffect(() => {
        const keyListener = (e: KeyboardEvent) => {
            if (e.key === key) {
                listener(e);
            }
        };
        window.addEventListener('keydown', keyListener);
        return () => window.removeEventListener('keydown', keyListener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, ...dependencies]);
}
