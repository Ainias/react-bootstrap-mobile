import * as React from 'react';
import { InputHTMLAttributes, KeyboardEvent, useCallback } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { prefixClass } from '../../../helper';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListener } from '../../Hooks/useListener';

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

function Input<OnChangeData>({
    label,
    className,
    onEnter,
    onKeyPress,
    onChangeText,
    ...otherProps
}: InputProps<OnChangeData>) {
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
        <label className={prefixClass('input', className)}>
            {label ? <span className={prefixClass('input-label')}>{label}</span> : null}
            <input
                {...otherProps}
                className={prefixClass('input-text')}
                onChange={onChange}
                onKeyPress={realOnKeyPress}
            />
        </label>
    );
}

const tmp = React.memo(Input) as typeof Input;
export { tmp as Input };
