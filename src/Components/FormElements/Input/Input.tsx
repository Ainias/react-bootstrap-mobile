import * as React from 'react';
import { ChangeEventHandler, InputHTMLAttributes, KeyboardEvent, MutableRefObject, useCallback } from 'react';
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
            onChangeText?: (newText: string) => void;
            onEnter?: (newText: string) => void;
            inline?: boolean
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
        onEnter,
        onKeyDown,
        inline = false,
        onChangeText,
        ...otherProps
    }: InputProps<OnChangeData, OnBlurData, OnChangeDoneData>,
    ref: MutableRefObject<HTMLInputElement> | null
) {
    // Variables

    // States

    // Refs
    const innerRef = useComposedRef(ref);

    // Callbacks
    const [onChangeWithData, otherPropsWithoutOnchange] = useListenerWithExtractedProps<'onChange', OnChangeData>(
        'onChange',
        otherProps
    );
    const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            if (onChangeText) {
                onChangeText(e.target.value);
            }
            onChangeWithData(e);
        },
        [onChangeWithData, onChangeText]
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
                onEnter((e.target as HTMLInputElement).value);
            }
        },
        [onEnter, onKeyDown]
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
