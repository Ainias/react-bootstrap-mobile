import * as React from 'react';
import {
    ChangeEventHandler,
    InputHTMLAttributes,
    KeyboardEvent,
    MutableRefObject,
    useCallback, useMemo,
    useRef,
    useState
} from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';
import { withForwardRef } from '../../../helper/withForwardRef';

import styles from './input.scss';
import classNames from 'classnames';
import { useComposedRef } from '../../Hooks/useComposedRef';
import { useOnChangeDone } from '../hooks/useOnChangeDone';

export type InputProps<OnChangeData, OnBlurData, OnChangeDoneData> = RbmComponentProps<
    Override<
        Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput'>,
        {
            label?: string;
            inline?: boolean;
            onChangeText?: (newText: string) => void;
            onEnter?: (newText: string) => void;
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
            ...otherProps
        }: InputProps<OnChangeData, OnBlurData, OnChangeDoneData>,
        ref: MutableRefObject<HTMLInputElement> | null
    ) {
        // Variables

        // States
        const usedValue = useMemo(() => {
            if (otherProps.type !== "number" || typeof value === "number"){
                return value;
            }
            if (typeof value === "string"){
                if (!Number.isNaN(Number(value))){
                    // Do not parse to allow ., and so on
                    return value;
                }
                if (!Number.isNaN(parseFloat(value))){
                    return parseFloat(value);
                }
            }
            return "";
        }, [value])
        // Refs
        const innerRef = useComposedRef(ref);

        // Callbacks
        const [onChangeWithData, otherPropsWithoutOnchange] = useListenerWithExtractedProps<'onChange', OnChangeData>(
            'onChange',
            otherProps
        );
        const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
            (e) => {
                if (otherProps.onChangeText) {
                    if (otherProps.type === "number") {
                        const val = !Number.isNaN(Number(e.target.value)) ? e.target.value : !Number.isNaN(parseFloat(e.target.value)) ? String(parseFloat(e.target.value)) : "";
                        otherProps.onChangeText(val);
                    } else {
                        otherProps.onChangeText(e.target.value);
                    }
                }
                onChangeWithData(e);
            },
            [onChangeWithData, otherProps.onChangeText, otherProps.type]
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
                if (otherProps.onEnter && e.key === 'Enter' && !e.defaultPrevented) {
                    if (otherProps.type === "number") {
                        const stringValue = (e.target as HTMLInputElement).value;
                        const val = !Number.isNaN(Number(stringValue)) ? stringValue : !Number.isNaN(parseFloat(stringValue)) ? String(parseFloat(stringValue)) : "";
                        otherProps.onEnter(val)
                    } else {
                        otherProps.onEnter((e.target as HTMLInputElement).value);
                    }

                }
            },
            [otherProps.onEnter, onKeyDown, otherProps.type]
        );

        // Effects
        useOnChangeDone(onChangeDone, innerRef);

        // Other

        // Render Functions

        return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label className={classNames(styles.input, {[styles.inline]: inline}, className)} style={style}>
                {label ? <span className={styles.label}>{label}</span> : null}
                <input
                    inputMode={otherProps.type === "number" ? "numeric" : undefined}
                    {...otherPropsWithoutData}
                    value={usedValue}
                    type={otherProps.type === "number" ? "text" : otherProps.type}
                    ref={innerRef}
                    className={styles.text}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyDown={realOnKeyDown}
                />
            </label>
        );
    },
    styles);
