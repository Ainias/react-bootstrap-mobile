import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
export type SwitchProps = RbmComponentProps<Override<InputHTMLAttributes<HTMLInputElement>, {
    preLabel?: string;
    label?: string;
    children?: string;
    isLabelBeforeSwitch?: boolean;
    isDual?: boolean;
    onChangeChecked?(isChecked: boolean): void;
}>>;
export declare const Switch: ({ children, label, preLabel, isLabelBeforeSwitch, isDual, id, className, style, onChange, onChangeChecked, ...props }: SwitchProps) => React.JSX.Element;
