import { useCallback, useState } from "react";
import { useDelayed } from "./useDelayed";

export function useDelayedState<T>(initialState: T | (() => T), delay = 100, maxDelay: number | undefined = undefined) {
    const [immediateState, setImmediateState] = useState(initialState);
    const [state, setState] = useState(immediateState);

    const setDelayedState = useDelayed((newState: (T)) => {
        setState(newState);
    }, [], delay, maxDelay);

    const setValue = useCallback((newValue: (T)) => {
        setImmediateState(newValue);
        setDelayedState(newValue);
    }, [setDelayedState]);

    return {state, immediateState, setState: setValue};
}
