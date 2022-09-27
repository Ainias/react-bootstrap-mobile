import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { SelectHTMLAttributes } from 'react';
import { OptionalListener } from '../../Hooks/useListener';
export declare type SelectOption = {
    label: string;
    value: string;
    key?: string;
};
export declare type SelectProps<OnChangeData> = RbmComponentProps<Override<SelectHTMLAttributes<HTMLSelectElement>, {
    label?: string;
    options: SelectOption[];
    onChangeValue?: (newValue: string) => void;
} & OptionalListener<'onChange', OnChangeData>>>;
declare function Select<OnChangeData>({ label, options, className, style, onChangeValue, ...otherProps }: SelectProps<OnChangeData>): JSX.Element;
declare const SelectMemo: typeof Select;
export { SelectMemo as Select };
