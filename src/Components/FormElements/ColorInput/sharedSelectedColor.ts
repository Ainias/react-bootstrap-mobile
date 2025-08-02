import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Random } from '@ainias42/js-helper';

const sharedSelectedColor: Record<string, { colors: string[]; updateFunctions: (() => void)[] }> = {};

function localStorageKey (key: string) {
    return `sharedSelectedColor-${key}`;
};

export function useSharedSelectedColor(key: string|undefined, predefinedColors: string[] = [], numberSavedColors = 16) {
    const shouldSaveToLocalStorage = typeof window !== 'undefined' && window.localStorage !== undefined && !!key;
    const [, setVersion] = useState(1);
    const innerKey = useRef(Random.getStringRandom(12));
    const realKey = key ?? innerKey.current;

    if (!sharedSelectedColor[realKey]) {
        sharedSelectedColor[realKey] = {
            colors: [],
            updateFunctions: [],
        };
    }

    const update = useCallback(() => setVersion((old) => old + 1), []);
    useMemo(() => {
        sharedSelectedColor[realKey].updateFunctions.push(update);
    }, [realKey, update]);

    const addColor = useCallback(
        (newColor: string) => {
            if (predefinedColors.includes(newColor)) {
                return;
            }

            sharedSelectedColor[realKey].colors = sharedSelectedColor[realKey].colors.filter(
                (color) => color !== newColor
            );
            sharedSelectedColor[realKey].colors.unshift(newColor);
            if (sharedSelectedColor[realKey].colors.length > numberSavedColors) {
                sharedSelectedColor[realKey].colors.splice(numberSavedColors, 1);
            }
            if (shouldSaveToLocalStorage){
                localStorage.setItem(localStorageKey(realKey), JSON.stringify(sharedSelectedColor[realKey].colors));
            }

            // triggers rerender
            sharedSelectedColor[realKey].updateFunctions.forEach((u) => u());
        },
        [numberSavedColors, predefinedColors, realKey, shouldSaveToLocalStorage]
    );

    useLayoutEffect(() => {
        if (shouldSaveToLocalStorage){
            const savedColors = localStorage.getItem(localStorageKey(realKey));
            if (savedColors) {
                sharedSelectedColor[realKey].colors = JSON.parse(savedColors);
                setVersion((old) => old + 1);
            }
        }
    }, [realKey, shouldSaveToLocalStorage]);

    const realColors = useMemo(() => {
        if (predefinedColors.length > 0) {
            return [...predefinedColors, ...sharedSelectedColor[realKey].colors.filter(color => !predefinedColors.includes(color))].slice(0, numberSavedColors);
        }
        return sharedSelectedColor[realKey].colors;
    }, [numberSavedColors, predefinedColors, realKey]);

    return { colors: realColors, addColor };
}
