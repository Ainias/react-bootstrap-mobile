import { useCallback, useState, MouseEvent } from 'react';
import { MenuProps } from './Menu';

export function useMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const open = useCallback((e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsOpen(true);
    }, []);

    const props: Omit<MenuProps, 'items'|"children"> = {
        isOpen,
        x: position.x,
        y: position.y,
        onClose: useCallback(() => setIsOpen(false), []),
    };

    return [open, props] as const;
}
