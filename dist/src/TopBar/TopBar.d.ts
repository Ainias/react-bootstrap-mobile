import { ComponentType, FunctionComponent } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export declare type TopBarComponentButtonType = {
    title?: string;
    icon?: string;
    component: ComponentType<Record<string, any>>;
    action?: () => void;
    disabled?: boolean;
    key?: string;
};
export declare type TopBarActionButtonType = {
    title: string;
    icon?: string;
    action: () => void;
    disabled?: boolean;
    key?: string;
};
export declare type TopBarButtonType = TopBarComponentButtonType | TopBarActionButtonType;
export declare type TopBarProps = RbmComponentProps<{
    title?: string;
    rightButtons?: TopBarButtonType[];
    leftButtons?: TopBarButtonType[];
}>;
export declare const TopBar: FunctionComponent<TopBarProps>;
