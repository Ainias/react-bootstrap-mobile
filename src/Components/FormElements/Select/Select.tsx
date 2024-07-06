import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { ChangeEventHandler, SelectHTMLAttributes, useCallback } from 'react';
import {OptionalListener, useListenerWithExtractedProps} from '../../Hooks/useListener';

import styles from './select.scss';
import { withMemo } from '../../../helper/withMemo';
import classNames from 'classnames';

export type SelectOption = {
    label: string;
    value: string;
    key?: string;
};

export type SelectProps<OnChangeData> = RbmComponentProps<
    Override<
        SelectHTMLAttributes<HTMLSelectElement>,
        {
            label?: string;
            options: SelectOption[];
            onChangeValue?: (newValue: string) => void;
            inline?: boolean;
            small?: boolean;
        } & OptionalListener<'onChange', OnChangeData>
    >
>;

export const Select = withMemo(function Select<OnChangeData>({
    label,
    options,
    className,
    style,
    onChangeValue,
    inline = false,
    small = false,
    ...otherProps
}: SelectProps<OnChangeData>) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks
    const [onChangeWithData, propsWithoutData] = useListenerWithExtractedProps<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
        (e) => {
            onChangeValue?.(e.target.value);
            onChangeWithData(e);
        },
        [onChangeWithData, onChangeValue]
    );

    // Effects

    // Other

    // Render Functions

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={classNames(styles.select, { [styles.inline]: inline, [styles.small]: small }, className)} style={style}>
            {label ? <span className={styles.label}>{label}</span> : null}
            <select {...propsWithoutData} className={styles.input} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value} key={option.key ?? option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
},
styles);
