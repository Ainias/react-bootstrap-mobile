/* eslint-disable no-bitwise */
import * as React from 'react';
import { useCallback, useRef, useState, MouseEvent } from 'react';
import { Color, ColorResult, SketchPicker } from 'react-color';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { withMemo } from '../../../helper/withMemo';

import styles from './colorInput.scss';

export type ColorInputProps<OnChangeData> = {
    defaultValue?: string;
    value?: string;
    label?: string;
    onChangeColor?: (newColor: string) => void;
} & OptionalListener<'onChange', OnChangeData>;

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
    // useStyles(styles);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);

    // States
    const [color, setColor] = useState<string>(defaultValue ?? '#000000FF');
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Selectors

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback(
        (newColor: ColorResult, e) => {
            const hexColor = convertToHex(newColor.rgb);
            setColor(hexColor);
            if (onChangeColor) {
                onChangeColor(hexColor);
            }
            onChangeWithData(e);
        },
        [onChangeColor, onChangeWithData]
    );

    const onContainerClick = useCallback((e: MouseEvent) => {
        if (e.target === containerRef?.current) {
            setIsOpen(false);
        }
    }, []);

    const openElement = useCallback((e: MouseEvent) => {
        setIsOpen(true);
        setPosition({ x: e.clientX, y: e.clientY });
    }, []);

    // Effects

    // Other

    // Render Functions
    const colVal: Color = value ?? color;

    return (
        <span>
            <span className={styles.colorInput}>
                {isOpen ? (
                    <div onClick={onContainerClick} className={styles.modalContainer} ref={containerRef}>
                        <div className={styles.modal} style={{ top: position.y, left: position.x }}>
                            <SketchPicker color={colVal} onChange={onChange} />
                        </div>
                    </div>
                ) : null}
                <span onClick={openElement} className={styles.label}>
                    {label}
                </span>
                <span onClick={openElement} style={{ backgroundColor: colVal }} className={styles.preview} />
            </span>
        </span>
    );
}

// Need ColorInputMemo for autocompletion of phpstorm
const ColorInputMemo = withMemo(ColorInput, styles);
export { ColorInputMemo as ColorInput };
