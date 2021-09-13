import { ComponentType, FunctionComponent } from 'react';
declare type ButtonType = {
    title?: string;
    icon?: string;
    component?: ComponentType<Record<string, any>>;
    action?: () => void;
    disabled?: boolean;
};
declare type Props = {
    title?: string;
    rightButtons?: ButtonType[];
    leftButtons?: ButtonType[];
};
export declare const TopBar: FunctionComponent<Props>;
export {};
