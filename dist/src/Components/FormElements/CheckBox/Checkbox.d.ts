import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { InputHTMLAttributes } from 'react';
import { Override } from '@ainias42/js-helper';
import { OptionalListener } from '../../Hooks/useListener';
export type CheckboxProps<OnChangeData, OnChangeCheckedData> = RbmComponentProps<Override<InputHTMLAttributes<HTMLInputElement>, {
    label?: string;
    children?: string;
    isLabelBeforeCheckbox?: boolean;
} & OptionalListener<'onChange', OnChangeData> & OptionalListener<'onChangeChecked', OnChangeCheckedData, boolean>>>;
declare function Checkbox<OnChangeData, OnChangeCheckedData>({ children, label, isLabelBeforeCheckbox, id, className, style, ...props }: CheckboxProps<OnChangeData, OnChangeCheckedData>): React.JSX.Element;
declare const tmp: typeof Checkbox;
export { tmp as Checkbox };
