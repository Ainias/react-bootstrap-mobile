import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { OptionalListener } from "../../Hooks/useListener";
export type SwitchProps<OnChangeCheckedData> = RbmComponentProps<Override<InputHTMLAttributes<HTMLInputElement>, {
    preLabel?: string;
    label?: string;
    children?: string;
    isLabelBeforeSwitch?: boolean;
    isDual?: boolean;
} & OptionalListener<"onChangeChecked", OnChangeCheckedData, boolean>>>;
export declare const Switch: <OnChangeCheckedData>({ children, label, preLabel, isLabelBeforeSwitch, isDual, id, className, style, onChange, ...props }: SwitchProps<OnChangeCheckedData>) => React.JSX.Element;
