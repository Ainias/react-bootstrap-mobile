import { ComponentType, FunctionComponent } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
export declare type TopBarComponentButtonType = {
    title?: string;
    icon?: IconSource;
    component: ComponentType<Record<string, any>>;
    action?: () => void;
    disabled?: boolean;
    key?: string;
};
export declare type TopBarActionButtonType = {
    title: string;
    icon?: IconSource;
    action: () => void;
    disabled?: boolean;
    key?: string;
};
export declare type TopBarButtonType = TopBarComponentButtonType | TopBarActionButtonType;
export declare type TopBarProps = RbmComponentProps<{
    title?: string;
    leftButtons?: TopBarButtonType[];
    rightButtons?: TopBarButtonType[];
    hiddenButtons?: TopBarButtonType[];
    transparent?: boolean;
    drawBehind?: boolean;
}>;
export declare const TopBar: FunctionComponent<TopBarProps>;
