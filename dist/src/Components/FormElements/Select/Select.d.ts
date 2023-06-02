import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { SelectHTMLAttributes } from 'react';
import { OptionalListener } from '../../Hooks/useListener';
export type SelectOption = {
    label: string;
    value: string;
    key?: string;
};
export type SelectProps<OnChangeData> = RbmComponentProps<Override<SelectHTMLAttributes<HTMLSelectElement>, {
    label?: string;
    options: SelectOption[];
    onChangeValue?: (newValue: string) => void;
    inline?: boolean;
} & OptionalListener<'onChange', OnChangeData>>>;
export declare const Select: <OnChangeData>({ label, options, className, style, onChangeValue, inline, ...otherProps }: SelectProps<OnChangeData>) => React.JSX.Element;
