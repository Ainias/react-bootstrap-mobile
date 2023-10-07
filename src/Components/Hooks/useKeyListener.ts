import { useEffect, useState } from 'react';
import { useWindow } from '../../WindowContext/WindowContext';

function isFormElement(element: EventTarget | null) {
    return (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
    );
}

export function useKeyListener(
    key: KeyboardEvent['key'],
    listener: (e: KeyboardEvent) => void,
    dependencies: any[] = [],
    ignoreFormElements = true
) {
    const window = useWindow();

    useEffect(() => {
        const lowercaseKey = key.toLowerCase();
        const keyListener = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === lowercaseKey && (!ignoreFormElements || !isFormElement(e.target))) {
                listener(e);
            }
        };
        window?.addEventListener('keydown', keyListener);
        return () => window?.removeEventListener('keydown', keyListener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window, key, ...dependencies]);
}

export function useKeyUpListener(
    key: KeyboardEvent['key'],
    listener: (e: KeyboardEvent) => void,
    dependencies: any[] = [],
    ignoreFormElements = true
) {
    useEffect(() => {
        const lowercaseKey = key.toLowerCase();
        const keyListener = (e: KeyboardEvent) => {
            if ((e.key === "Meta" || e.key.toLowerCase() === lowercaseKey) && (!ignoreFormElements || !isFormElement(e.target))) {
                listener(e);
            }
        };
        window.addEventListener('keyup', keyListener);
        return () => window.removeEventListener('keyup', keyListener);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, ...dependencies]);
}

export function useKeyPressed(key: KeyboardEvent['key'], ignoreFormElements = true, preventDefault = true) {
    const [isPressed, setIsPressed] = useState(false);
    useKeyListener(
        key,
        (e) => {
            setIsPressed(true);
            if (preventDefault) {
                e.preventDefault();
            }
        },
        [isPressed],
        ignoreFormElements
    );
    useKeyUpListener(
        key,
        (e) => {
            setIsPressed(false);
            if (preventDefault) {
                e.preventDefault();
            }
        },
        [],
        false
    );
    return isPressed;
}
