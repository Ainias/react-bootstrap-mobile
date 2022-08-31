import * as React from 'react';
import { ForwardedRef, InputHTMLAttributes, KeyboardEvent, useCallback } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { withForwardRef } from '../../../helper/withForwardRef';

import styles from './input.scss';
import classNames from 'classnames';

export type InputProps<OnChangeData> = RbmComponentProps<
    Override<
        InputHTMLAttributes<HTMLInputElement>,
        {
            label?: string;
            onChangeText?: (newText: string) => void;
            onEnter?: (newText: string) => void;
        } & OptionalListener<'onChange', OnChangeData>
    >
>;

function Input<OnChangeData>(
    { label, className, style, onEnter, onKeyPress, onChangeText, ...otherProps }: InputProps<OnChangeData>,
    ref: ForwardedRef<HTMLInputElement>
) {
    // Variables

    // States

    // Refs

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback(
        (e) => {
            if (onChangeText) {
                onChangeText(e.target.value);
            }
            onChangeWithData(e);
        },
        [onChangeWithData, onChangeText]
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

    // Other

    // Render Functions

    return (
        <label className={classNames(styles.input, className)} style={style}>
            {label ? <span className={styles.label}>{label}</span> : null}
            <input {...otherProps} ref={ref} className={styles.text} onChange={onChange} onKeyPress={realOnKeyPress} />
        </label>
    );
}

const tmp = withForwardRef(Input, styles);
export { tmp as Input };
