import {useLayoutEffect, useRef} from "react";

export function useMousePosition() {
    const position = useRef({ x: 0, y: 0 });
    useLayoutEffect(() => {
        const setFromEvent = (e: MouseEvent) => {
            position.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', setFromEvent);
        return () => window.removeEventListener('mousemove', setFromEvent);
    }, []);
    return position;
}
