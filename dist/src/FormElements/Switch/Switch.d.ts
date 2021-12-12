import { FunctionComponent, InputHTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
declare type Props = RbmComponentProps<{
    preLabel?: string;
    label?: string;
    children?: string;
    isLabelBeforeSwitch?: boolean;
    isDual?: boolean;
} & InputHTMLAttributes<HTMLInputElement>>;
export declare const Switch: FunctionComponent<Props>;
export {};
