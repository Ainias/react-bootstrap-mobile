import { ComponentType } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
export declare type TopBarActionButtonType = {
    title: string;
    icon?: IconSource;
    action: () => void;
    disabled?: boolean;
    key?: string;
};
export declare type TopBarComponentButtonType = Partial<TopBarActionButtonType> & {
    component: ComponentType<Record<string, any>>;
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
declare function TopBar({ title, rightButtons, leftButtons, hiddenButtons, className, transparent, drawBehind, ...rbmProps }: TopBarProps): JSX.Element;
declare const TopBarMemo: typeof TopBar;
export { TopBarMemo as TopBar };
