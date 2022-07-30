import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { SelectHTMLAttributes, useCallback } from 'react';
import { OptionalListener, useListener } from '../../Hooks/useListener';

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
        } & OptionalListener<'onChange', OnChangeData>
    >
>;

function Select<OnChangeData>({ label, options, className, onChangeValue, ...otherProps }: SelectProps<OnChangeData>) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback(
        (e) => {
            if (onChangeValue) {
                onChangeValue(e.target.value);
            }
            onChangeWithData(e);
        },
        [onChangeWithData, onChangeValue]
    );

    // Effects

    // Other

    // Render Functions

    return (
        <label className={classNames(styles.select, className)}>
            {label ? <span>{label}</span> : null}
            <select {...otherProps} className={styles.input} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value} key={option.key ?? option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

// Need SelectMemo for autocompletion of phpstorm
const SelectMemo = withMemo(Select, styles);
export { SelectMemo as Select };