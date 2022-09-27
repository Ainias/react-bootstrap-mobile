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
    onOpen?: (currentColor: string) => void;
    onClose?: (newColor: string) => void;
    disableAlpha?: boolean;
} & OptionalListener<'onChange', OnChangeData>;

function convertToHex(color: { r: number; g: number; b: number; a?: number }, disableAlpha?: boolean) {
    let newColor = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b
        .toString(16)
        .padStart(2, '0')}`;
    if (color.a !== undefined && !disableAlpha) {
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
    onOpen,
    onClose,
    disableAlpha,
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
            const hexColor = convertToHex(newColor.rgb, disableAlpha);
            setColor(hexColor);
            if (onChangeColor) {
                onChangeColor(hexColor);
            }
            onChangeWithData(e);
        },
        [disableAlpha, onChangeColor, onChangeWithData]
    );

    const onContainerClick = useCallback(
        (e: MouseEvent) => {
            if (e.target === containerRef?.current) {
                setIsOpen(false);
                onClose?.(color);
            }
        },
        [color, onClose]
    );

    const openElement = useCallback(
        (e: MouseEvent) => {
            setIsOpen(true);
            setPosition({ x: e.clientX, y: e.clientY });
            onOpen?.(color);
        },
        [color, onOpen]
    );

    // Effects

    // Other

    // Render Functions
    const colVal: Color = value ?? color;

    return (
        <span className={styles.colorInput}>
            {isOpen ? (
                <div onClick={onContainerClick} className={styles.modalContainer} ref={containerRef}>
                    <div className={styles.modal} style={{ top: position.y, left: position.x }}>
                        <SketchPicker color={colVal} onChange={onChange} disableAlpha={disableAlpha} />
                    </div>
                </div>
            ) : null}
            <span onClick={openElement} className={styles.label}>
                {label}
            </span>
            <span onClick={openElement} style={{ backgroundColor: colVal }} className={styles.preview} />
        </span>
    );
}

// Need ColorInputMemo for autocompletion of phpstorm
const ColorInputMemo = withMemo(ColorInput, styles);
export { ColorInputMemo as ColorInput };
