import { InputHTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener } from '../../Hooks/useListener';
export type InputProps<OnChangeData, OnBlurData, OnChangeDoneData> = RbmComponentProps<Override<Omit<InputHTMLAttributes<HTMLInputElement>, 'onInput'>, {
    label?: string;
    onChangeText?: (newText: string) => void;
    onEnter?: (newText: string) => void;
} & OptionalListener<'onChange', OnChangeData> & OptionalListener<'onBlur', OnBlurData> & OptionalListener<'onChangeDone', OnChangeDoneData>>>;
export declare const Input: import("../../../helper/withForwardRef").RefComponent<InputProps<unknown, unknown, unknown>, HTMLInputElement>;
