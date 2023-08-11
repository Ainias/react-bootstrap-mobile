import {useWindow} from "../../WindowContext/WindowContext";
import {useEffect, useReducer} from "react";


export function useWindowDimensions() {
	const [, redraw] = useReducer((x) => x + 1, 0);
	const window = useWindow();

	useEffect(() => {
		window?.addEventListener('resize', redraw);
		return () => {
			window?.removeEventListener('resize', redraw);
		};
	}, [window]);

    return {x: window?.innerWidth ?? 0, y: window?.innerHeight ?? 0};
};
