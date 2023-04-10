import * as React from 'react';
import { useCallback, useRef, useState, MouseEvent, useEffect, useLayoutEffect } from 'react';
import { Color, ColorChangeHandler, ColorResult, SketchPicker } from 'react-color';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { withMemo } from '../../../helper/withMemo';

import styles from './colorInput.scss';
import { useSharedSelectedColor } from './sharedSelectedColor';

export type ColorInputProps<OnChangeData> = {
    defaultValue?: string;
    value?: string;
    label?: string;
    onChangeColor?: (newColor: string) => void;
    onOpen?: (currentColor: string) => void;
    onChangeColorComplete?: (newColor: string) => void;
    onClose?: (newColor: string) => void;
    disableAlpha?: boolean;
    presetColors?: string[];
    sharedColorKey?: string;
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
    onChangeColorComplete,
    onOpen,
    onClose,
    disableAlpha,
    presetColors,
    sharedColorKey,
    ...otherProps
}: ColorInputProps<OnChangeData>) {
    // Variables
    // useStyles(styles);

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // States
    const [color, setColor] = useState<string>(value ?? defaultValue ?? '#000000FF');
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const { colors, addColor } = useSharedSelectedColor(sharedColorKey);

    const colVal: Color = value ?? color;
    // Selectors

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback<ColorChangeHandler>(
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
    const onChangeComplete = useCallback(
        (newColor: ColorResult) => {
            const hexColor = convertToHex(newColor.rgb, disableAlpha);
            setColor(hexColor);
            if (onChangeColorComplete) {
                onChangeColorComplete(hexColor);
            }
        },
        [disableAlpha, onChangeColorComplete]
    );

    const onContainerClick = useCallback(
        (e: MouseEvent) => {
            if (e.target === containerRef?.current) {
                setIsOpen(false);
                addColor(colVal);
                onClose?.(colVal);
            }
        },
        [addColor, colVal, onClose]
    );

    const openElement = useCallback(
        (e: MouseEvent) => {
            setIsOpen(true);
            setPosition({ x: e.clientX, y: e.clientY });
            onOpen?.(colVal);
        },
        [colVal, onOpen]
    );

    // Effects
    useLayoutEffect(() => {
        if (!modalRef.current) {
            return;
        }
        const dimension = modalRef.current.getBoundingClientRect();
        if (dimension.right > window.innerWidth || dimension.bottom > window.innerHeight) {
            const newPosition = {
                x: Math.max(0, Math.min(window.innerWidth - dimension.width, position.x)),
                y: Math.max(0, Math.min(window.innerHeight - dimension.height, position.y)),
            };
            setPosition(newPosition);
        }
    }, [position]);

    // Other

    // Render Functions
    return (
        <span className={styles.colorInput}>
            {isOpen ? (
                <div onClick={onContainerClick} className={styles.modalContainer} ref={containerRef}>
                    <div className={styles.modal} style={{ top: position.y, left: position.x }} ref={modalRef}>
                        <SketchPicker
                            color={colVal}
                            onChange={onChange}
                            onChangeComplete={onChangeComplete}
                            disableAlpha={disableAlpha}
                            presetColors={presetColors ?? colors}
                        />
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
