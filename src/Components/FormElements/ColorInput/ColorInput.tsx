import * as React from 'react';
import { useCallback, useRef, useState, MouseEvent, useMemo } from 'react';
import { ColorResult, Sketch } from '@uiw/react-color';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { withMemo } from '../../../helper/withMemo';
import styles from './colorInput.scss';
import { useSharedSelectedColor } from './sharedSelectedColor';
import { Menu } from "../../Menu/Menu";
import { useClientLayoutEffect } from "../../Hooks/useClientLayoutEffect";
import { FormError } from "../FormError";
import classNames from "classnames";

export type ColorInputProps<OnChangeData> = {
    defaultValue?: string;
    value?: string;
    label?: string;
    onChangeColor?: (newColor: string) => void;
    onOpen?: (currentColor: string) => void;
    onClose?: (newColor: string) => void;
    disableAlpha?: boolean;
    presetColors?: string[];
    sharedColorKey?: string;
    disabled?: boolean
    error?: string;
    className?: string;
} & OptionalListener<'onChange', OnChangeData, ColorResult>;

function ColorInput<OnChangeData>({
                                      defaultValue,
                                      value,
                                      label,
                                      onChangeColor,
                                      onOpen,
                                      onClose,
                                      disableAlpha,
                                      presetColors,
                                      error,
                                      sharedColorKey = "default",
                                      disabled,
    className,
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

    const {colors, addColor} = useSharedSelectedColor(sharedColorKey, presetColors);
    const realIsOpen = disabled !== true && isOpen;

    const colVal = useMemo(() => {
        const newVal = value ?? color;
        if (disableAlpha && newVal.length === 9) {
            return newVal.substring(0, 7);
        }
        if (disableAlpha && newVal.length === 5) {
            return newVal.substring(0,4);
        }
        return newVal;
    }, [value, color, disableAlpha]);

    // Selectors

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData, ColorResult>('onChange', otherProps);
    const onChange = useCallback(
        (newColor: ColorResult) => {
            const hexColor = newColor.hexa;
            setColor(hexColor);
            if (onChangeColor) {
                onChangeColor(hexColor);
            }
            onChangeWithData(newColor);
        },
        [onChangeColor, onChangeWithData]
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
        <span className={classNames(styles.colorInput, className)}>
            <Menu x={position.x} y={position.y} isOpen={realIsOpen} onClose={onMenuClose}>
                        <Sketch
                            color={colVal}
                            onChange={onChange}
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
