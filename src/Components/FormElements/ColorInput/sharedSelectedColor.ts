import { useCallback, useMemo, useRef, useState } from 'react';
import { Random } from 'js-helper';

const sharedSelectedColor: Record<string, { colors: string[]; updateFunctions: (() => void)[] }> = {};

export function useSharedSelectedColor(key?: string, numberSavedColors = 15) {
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
            sharedSelectedColor[realKey].colors = sharedSelectedColor[realKey].colors.filter(
                (color) => color !== newColor
            );
            sharedSelectedColor[realKey].colors.unshift(newColor);
            if (sharedSelectedColor[realKey].colors.length > numberSavedColors) {
                sharedSelectedColor[realKey].colors.splice(numberSavedColors, 1);
            }

            // triggers rerender
            sharedSelectedColor[realKey].updateFunctions.forEach((u) => u());
        },
        [numberSavedColors, realKey]
    );

    return { colors: sharedSelectedColor[realKey]?.colors, addColor };
}
