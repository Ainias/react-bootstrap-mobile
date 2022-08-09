import { InputHTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener } from '../../Hooks/useListener';
export declare type InputProps<OnChangeData> = RbmComponentProps<Override<InputHTMLAttributes<HTMLInputElement>, {
    label?: string;
    onChangeText?: (newText: string) => void;
    onEnter?: (newText: string) => void;
} & OptionalListener<'onChange', OnChangeData>>>;
declare const tmp: import("../../../helper/withForwardRef").RefComponent<InputProps<unknown>, HTMLInputElement>;
export { tmp as Input };
