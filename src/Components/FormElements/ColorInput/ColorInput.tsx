/* eslint-disable no-bitwise */
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Color, ColorResult, SketchPicker } from 'react-color';
import { OptionalListener, useListener } from '../../Hooks/useListener';

export type ColorInputProps<OnChangeData> = {
    defaultValue?: string;
    value?: string;
    label?: string;
    onChangeColor?: (newColor: string) => void;
} & OptionalListener<'onChange', OnChangeData>;

function convertToRGBA(color: string) {
    if (/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(color)) {
        const colorParts = color.substring(1).split('');
        const c = { r: 0, g: 0, b: 0, a: 1 };
        if (colorParts.length === 3) {
            c.r = parseInt(colorParts[0] + colorParts[0], 16);
            c.g = parseInt(colorParts[1] + colorParts[1], 16);
            c.b = parseInt(colorParts[2] + colorParts[2], 16);
        } else {
            c.r = parseInt(colorParts[0] + colorParts[1], 16);
            c.g = parseInt(colorParts[2] + colorParts[3], 16);
            c.b = parseInt(colorParts[4] + colorParts[5], 16);

            if (colorParts.length === 8) {
                c.a = parseInt(colorParts[6] + colorParts[7], 16) / 255;
            }
        }
        return c;
    }
    return color;
}

function convertToHex(color: { r: number; g: number; b: number; a?: number }) {
    let newColor = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b
        .toString(16)
        .padStart(2, '0')}`;
    if (color.a !== undefined) {
        newColor += Math.round(color.a * 255)
            .toString(16)
            .padStart(2, '0');
    }
    return newColor;
}

function ColorInput<OnChangeData>({
    defaultValue,
    value,
    label,
    onChangeColor,
    ...otherProps
}: ColorInputProps<OnChangeData>) {
    // Variables

    // Refs

    // States
    const [color, setColor] = useState<Color>(defaultValue ?? '#000000FF');
    const [isOpen, setIsOpen] = useState(true);

    // Selectors

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback(
        (newColor: ColorResult, e) => {
            const hexColor = convertToHex(newColor.rgb);
            setColor(hexColor);
            console.log('LOG hex-Color converted', hexColor, newColor);
            if (onChangeColor) {
                onChangeColor(hexColor);
            }
            onChangeWithData(e);
        },
        [onChangeColor, onChangeWithData]
    );

    // Effects

    // Other

    // Render Functions
    const colVal: Color = value ?? color;

    return <span>{isOpen ? <SketchPicker color={colVal} onChange={onChange} /> : null}</span>;
}

// Need ColorInputMemo for autocompletion of phpstorm
const ColorInputMemo = React.memo(ColorInput) as typeof ColorInput;
export { ColorInputMemo as ColorInput };
