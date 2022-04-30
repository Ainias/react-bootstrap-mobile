import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { SelectHTMLAttributes, useCallback } from 'react';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { prefixClass } from '../../../helper';

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
        <label className={prefixClass('select', className)}>
            {label ? <span className={prefixClass('input-label')}>{label}</span> : null}
            <select {...otherProps} className={prefixClass('select-input')} onChange={onChange}>
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
const SelectMemo = React.memo(Select) as typeof Select;
export { SelectMemo as Select };
