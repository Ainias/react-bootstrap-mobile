import { InputHTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
export declare type SwitchProps = RbmComponentProps<Override<InputHTMLAttributes<HTMLInputElement>, {
    preLabel?: string;
    label?: string;
    children?: string;
    isLabelBeforeSwitch?: boolean;
    isDual?: boolean;
    onChangeChecked?(isChecked: boolean): void;
}>>;
declare function Switch({ children, label, preLabel, isLabelBeforeSwitch, isDual, id, className, onChange, onChangeChecked, ...props }: SwitchProps): JSX.Element;
declare const SwitchMemo: typeof Switch;
export { SwitchMemo as Switch };
