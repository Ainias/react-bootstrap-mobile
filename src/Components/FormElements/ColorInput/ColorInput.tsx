import * as React from 'react';
import { useCallback, useRef, useState, MouseEvent } from 'react';
import { Color, ColorChangeHandler, ColorResult, SketchPicker } from 'react-color';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { withMemo } from '../../../helper/withMemo';
import styles from './colorInput.scss';
import { useSharedSelectedColor } from './sharedSelectedColor';
import { Menu } from "../../Menu/Menu";
import { useClientLayoutEffect } from "../../Hooks/useClientLayoutEffect";
import { FormError } from "../FormError";

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
    disabled?: boolean
    error?: string;
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
                                      error,
                                      sharedColorKey = "default",
                                      disabled,
                                      ...otherProps
                                  }: ColorInputProps<OnChangeData>) {
    // Variables
    // useStyles(styles);

    // Refs
    const modalRef = useRef<HTMLDivElement>(null);

    // States
    const [color, setColor] = useState<string>(value ?? defaultValue ?? '#000000FF');
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});

    const {colors, addColor} = useSharedSelectedColor(sharedColorKey);
    const realIsOpen = disabled !== true && isOpen;

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

    const onMenuClose = useCallback(
        () => {
            setIsOpen(false);
            addColor(colVal);
            onClose?.(colVal);
        },
        [addColor, colVal, onClose]
    );

    const openElement = useCallback(
        (e: MouseEvent) => {
            if (disabled) {
                return;
            }

            setIsOpen(true);
            setPosition({x: e.clientX, y: e.clientY});
            onOpen?.(colVal);
        },
        [colVal, disabled, onOpen]
    );

    // Effects
    useClientLayoutEffect(() => {
        if (!modalRef.current) {
            return;
        }
        const dimension = modalRef.current.getBoundingClientRect();
        if (dimension.right > window.innerWidth || dimension.bottom > window.innerHeight) {
            const newPosition = {
                x: Math.max(0, Math.min(window.innerWidth - dimension.width - 3, position.x)),
                y: Math.max(0, Math.min(window.innerHeight - dimension.height - 3, position.y)),
            };
            if (newPosition.x !== position.x || newPosition.y !== position.y) {
                setPosition(newPosition);
            }
        }
    }, [position]);

    // Other

    // Render Functions
    return (
        <>
        <span className={styles.colorInput}>
            <Menu x={position.x} y={position.y} isOpen={realIsOpen} onClose={onMenuClose}>
                        <SketchPicker
                            color={colVal}
                            onChange={onChange}
                            onChangeComplete={onChangeComplete}
                            disableAlpha={disableAlpha}
                            presetColors={presetColors ?? colors}
                        />
            </Menu>
            <span onClick={openElement} className={styles.label}>
                {label}
            </span>
            <span onClick={openElement} style={{backgroundColor: colVal}} className={styles.preview}/>
        </span>
            <FormError error={error}/>
        </>
    );
}

// Need ColorInputMemo for autocompletion of phpstorm
const ColorInputMemo = withMemo(ColorInput, styles);
export { ColorInputMemo as ColorInput };
