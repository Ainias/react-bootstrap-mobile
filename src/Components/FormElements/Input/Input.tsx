import * as React from 'react';
import { InputHTMLAttributes, KeyboardEvent, MutableRefObject, useCallback, useEffect } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';
import { withForwardRef } from '../../../helper/withForwardRef';

import styles from './input.scss';
import classNames from 'classnames';
import { useComposedRef } from '../../Hooks/useComposedRef';

export type InputProps<OnChangeData, OnBlurData, OnChangeDoneData> = RbmComponentProps<
    Override<
        Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput'>,
        {
            label?: string;
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
        onEnter,
        onKeyPress,
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
    const onChange = useCallback(
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

    const realOnKeyPress = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (onKeyPress) {
                onKeyPress(e);
            }
            if (onEnter && e.key === 'Enter' && !e.defaultPrevented) {
                onEnter((e.target as HTMLInputElement).value);
            }
        },
        [onEnter, onKeyPress]
    );

    // Effects
    useEffect(() => {
        const elem = innerRef.current;
        elem?.addEventListener('change', onChangeDone);
        return () => {
            elem?.removeEventListener('change', onChangeDone);
        };
    }, [innerRef, onChangeDone, otherProps.type]);

    // Other

    // Render Functions

    return (
        <label className={classNames(styles.input, className)} style={style}>
            {label ? <span className={styles.label}>{label}</span> : null}
            <input
                {...otherPropsWithoutData}
                ref={innerRef}
                className={styles.text}
                onBlur={onBlur}
                onChange={onChange}
                onKeyPress={realOnKeyPress}
            />
        </label>
    );
},
styles);
