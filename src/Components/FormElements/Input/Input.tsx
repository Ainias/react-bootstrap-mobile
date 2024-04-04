import * as React from 'react';
import { ChangeEventHandler, InputHTMLAttributes, KeyboardEvent, MutableRefObject, useCallback, useRef } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';
import { withForwardRef } from '../../../helper/withForwardRef';

import styles from './input.scss';
import classNames from 'classnames';
import { useComposedRef } from '../../Hooks/useComposedRef';
import { useOnChangeDone } from '../hooks/useOnChangeDone';

type InputTypes =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

export type InputProps<OnChangeData, OnBlurData, OnChangeDoneData> = RbmComponentProps<
    Override<
        Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput' | "type">,
        {
            label?: string;
            inline?: boolean
        } & OptionalListener<'onChange', OnChangeData> &
        OptionalListener<'onBlur', OnBlurData> &
        OptionalListener<'onChangeDone', OnChangeDoneData>
        & ({
        type?: InputTypes
        onChangeText?: (newText: string) => void;
        onEnter?: (newText: string) => void;
    } | {
        type: "number"
        onChangeText?: (newNumber: number) => void;
        onEnter?: (newNumber: number) => void;
    })
    >
>;

export const Input = withForwardRef(function Input<OnChangeData, OnBlurData, OnChangeDoneData>(
        {
            label,
            className,
            style,
            onKeyDown,
            inline = false,
            ...otherProps
        }: InputProps<OnChangeData, OnBlurData, OnChangeDoneData>,
        ref: MutableRefObject<HTMLInputElement> | null
    ) {
        // Variables

        // States

        // Refs
        const innerRef = useComposedRef(ref);
        const lastValueRef = useRef(NaN);

        // Callbacks
        const [onChangeWithData, otherPropsWithoutOnchange] = useListenerWithExtractedProps<'onChange', OnChangeData>(
            'onChange',
            otherProps
        );
        const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
            (e) => {
                if (otherProps.onChangeText) {
                    if (otherProps.type === "number") {
                        if (Number.isNaN(e.target.valueAsNumber)){
                            otherProps.onChangeText(lastValueRef.current);
                        } else {
                            otherProps.onChangeText(e.target.valueAsNumber);
                            lastValueRef.current = e.target.valueAsNumber;
                        }
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
                        if (Number.isNaN((e.target as HTMLInputElement).valueAsNumber)){
                            otherProps.onEnter(lastValueRef.current);
                        } else {
                            otherProps.onEnter((e.target as HTMLInputElement).valueAsNumber);
                            lastValueRef.current = (e.target as HTMLInputElement).valueAsNumber;
                        }
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
                    {...otherPropsWithoutData}
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
