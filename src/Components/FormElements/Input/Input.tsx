import * as React from 'react';
import {
    ChangeEvent,
    InputHTMLAttributes,
    KeyboardEvent,
    MutableRefObject,
    useCallback, useEffect,
    useMemo, useRef,
} from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';
import { withForwardRef } from '../../../helper/withForwardRef';

import styles from './input.scss';
import classNames from 'classnames';
import { useComposedRef } from '../../Hooks/useComposedRef';
import { useOnChangeDone } from '../hooks/useOnChangeDone';
import { InlineBlock } from "../../Layout/InlineBlock";
import { Text } from "../../Text/Text";
import { useSendFormContext } from "../Controller/SendFormContext";

export type InputProps<OnChangeData, OnBlurData, OnChangeDoneData> = RbmComponentProps<
    Override<
        Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput'>,
        {
            label?: string;
            inline?: boolean;
            onChangeText?: (newText: string) => void;
            onEnter?: (newText: string) => void;
            error?: string,
        } & OptionalListener<'onChange', OnChangeData> &
        OptionalListener<'onBlur', OnBlurData> &
        OptionalListener<'onChangeDone', OnChangeDoneData>
    >
>;

export const Input = withForwardRef(function Input<OnChangeData, OnBlurData, OnChangeDoneData>(
        {
            label,
            className,
            style,
            onKeyDown,
            inline = false,
            value,
            error,
            onChangeText,
            onEnter,
            ...otherProps
        }: InputProps<OnChangeData, OnBlurData, OnChangeDoneData>,
        ref: MutableRefObject<HTMLInputElement> | null
    ) {
        // Variables

        // States
        const usedValue = useMemo(() => {
            if (otherProps.type !== "number" || typeof value === "number") {
                return value;
            }
            if (typeof value === "string") {
                if (value === "-") {
                    return value;
                }

                const numberValue = parseFloat(value);
                if (!Number.isNaN(numberValue) && Number.isFinite(numberValue)) {
                    if (otherProps.max !== undefined && numberValue > Number(otherProps.max)) {
                        return otherProps.max;
                    }
                    if (otherProps.min !== undefined && numberValue < Number(otherProps.min)) {
                        return otherProps.min;
                    }
                }

                if (!Number.isNaN(Number(value))) {
                    // Do not parse to allow ., and so on
                    return value;
                }
                if (!Number.isNaN(numberValue)) {
                    return parseFloat(value);
                }
            }
            return "";
        }, [value, otherProps.max, otherProps.min, otherProps.type]);
        // Refs
        const innerRef = useRef<HTMLInputElement>(null);
        const refFunction = useComposedRef(ref, innerRef);

        // Callbacks
        const sendForm = useSendFormContext();
        onEnter ??= sendForm;

        const [onChangeWithData, otherPropsWithoutOnchange] = useListenerWithExtractedProps<'onChange', OnChangeData>(
            'onChange',
            otherProps
        );
        const onChange = useCallback(
            (e: ChangeEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>) => {
                if (onChangeText) {
                    if (otherProps.type === "number") {
                        if (e.currentTarget.value === "-") {
                            onChangeText(e.currentTarget.value);
                            return;
                        }

                        const val = !Number.isNaN(Number(e.currentTarget.value)) ? e.currentTarget.value : !Number.isNaN(parseFloat(e.currentTarget.value)) ? String(parseFloat(e.currentTarget.value)) : "";
                        onChangeText(val);
                    } else {
                        onChangeText(e.currentTarget.value);
                    }
                }
                onChangeWithData(e);
            },
            [onChangeWithData, onChangeText, otherProps.type]
        );

        const [onBlur, otherPropsWithoutBlur] = useListenerWithExtractedProps<'onBlur', OnBlurData>(
            'onBlur',
            otherPropsWithoutOnchange
        );

        const [onChangeDone, otherPropsWithoutData] = useListenerWithExtractedProps<'onChangeDone', OnChangeDoneData>(
            'onChangeDone',
            otherPropsWithoutBlur
        );

        const realOnKeyDown = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                onKeyDown?.(e);
                if (onEnter && e.key === 'Enter' && !e.defaultPrevented) {
                    if (otherProps.type === "number") {
                        const stringValue = (e.target as HTMLInputElement).value;
                        const val = !Number.isNaN(Number(stringValue)) ? stringValue : !Number.isNaN(parseFloat(stringValue)) ? String(parseFloat(stringValue)) : "";
                        onEnter(val);
                    } else {
                        onEnter((e.target as HTMLInputElement).value);
                    }
                }

                if (otherProps.type === "number") {
                    const step = otherProps.step ? Number(otherProps.step) : 1;
                    if (e.key === "ArrowUp") {
                        let newValue = (parseFloat(e.currentTarget.value) || 0) + step;
                        if (otherProps.max !== undefined && newValue > Number(otherProps.max)) {
                            newValue = Number(otherProps.max);
                        }
                        e.currentTarget.value = newValue.toString();
                        onChange(e);
                    } else if (e.key === "ArrowDown") {
                        let newValue = (parseFloat(e.currentTarget.value) || 0) - step;
                        if (otherProps.min !== undefined && newValue < Number(otherProps.min)) {
                            newValue = Number(otherProps.min);
                        }
                        e.currentTarget.value = newValue.toString();
                        onChange(e);
                    }
                }
            },
            [onKeyDown, onChange, otherProps]
        );

        // Effects
        useOnChangeDone(onChangeDone, innerRef);

        useEffect(() => {
            // Add the onChangeDone for numbers
            if (otherProps.type === "number") {
                const elem = innerRef.current;
                elem?.addEventListener('blur', onChangeDone);
                return () => {
                    elem?.removeEventListener('blur', onChangeDone);
                };
            }
            return undefined;
        }, [ref, onChangeDone, innerRef, otherProps.type]);


        // Other

        // Render Functions

        return (
            <label className={classNames(styles.input, {[styles.inline]: inline}, className)} style={style}>
                {label ? <span className={styles.label}>{label}</span> : null}
                <input
                    inputMode={otherProps.type === "number" ? "numeric" : undefined}
                    {...otherPropsWithoutData}
                    value={usedValue}
                    type={otherProps.type === "number" ? "text" : otherProps.type}
                    ref={refFunction}
                    className={styles.text}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyDown={realOnKeyDown}
                />
                {error && <InlineBlock className={styles.error}><Text>{error}</Text></InlineBlock>}
            </label>
        );
    },
    styles);
