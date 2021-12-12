import * as React from 'react';
import { ChangeEvent, InputHTMLAttributes, useCallback } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { prefixClass } from '../../helper';
import { RbmListener } from '../EventTypes';
import { Override } from '../../TypeHelpers';

export type InputProps<OnChangeData> = RbmComponentProps<
    Override<
        InputHTMLAttributes<HTMLInputElement>,
        {
            label?: string;
            onChange?: RbmListener<ChangeEvent<HTMLInputElement>, OnChangeData>;
            onChangeData?: OnChangeData;
        }
    >
>;

function Input<OnChangeData>({
    label,
    className,
    onChangeData,
    onChange: outsideOnChange,
    ...rbmProps
}: InputProps<OnChangeData>) {
    // Variables

    // States

    // Refs

    // Callbacks
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (outsideOnChange) {
                outsideOnChange(Object.assign(e, { extraData: onChangeData }));
            }
        },
        [outsideOnChange, onChangeData]
    );

    // Effects

    // Other

    // Render Functions

    return (
        <label className={prefixClass('input', className)}>
            {label ? <span className={prefixClass('input-label')}>{label}</span> : null}
            <input {...rbmProps} className={prefixClass('input-text')} onChange={onChange} />
        </label>
    );
}

const tmp = React.memo(Input) as typeof Input;
export { tmp as Input };
