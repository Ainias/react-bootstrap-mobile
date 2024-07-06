import {useRef} from "react";
import { useClientLayoutEffect } from "./useClientLayoutEffect";

export function useMousePosition() {
    const position = useRef({ x: 0, y: 0 });
    useClientLayoutEffect(() => {
        const setFromEvent = (e: MouseEvent) => {
            position.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', setFromEvent);
        return () => window.removeEventListener('mousemove', setFromEvent);
    }, []);
    return position;
}
