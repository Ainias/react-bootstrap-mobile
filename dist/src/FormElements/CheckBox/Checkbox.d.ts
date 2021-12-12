import { RbmComponentProps } from '../../RbmComponentProps';
import { InputHTMLAttributes } from 'react';
export declare type CheckboxProps = RbmComponentProps<{
    label?: string;
    children?: string;
    isLabelBeforeCheckbox?: boolean;
} & InputHTMLAttributes<HTMLInputElement>>;
declare function Checkbox({ children, label, isLabelBeforeCheckbox, id, className, ...props }: CheckboxProps): JSX.Element;
declare const tmp: typeof Checkbox;
export { tmp as Checkbox };
