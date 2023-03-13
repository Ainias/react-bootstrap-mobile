import { ComponentType } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
export type TopBarActionButtonType = {
    title: string;
    icon?: IconSource;
    action: () => void;
    disabled?: boolean;
    key?: string;
};
export type TopBarComponentButtonType = Partial<TopBarActionButtonType> & {
    component: ComponentType<Record<string, any>>;
};
export type TopBarButtonType = TopBarComponentButtonType | TopBarActionButtonType;
export type TopBarProps = RbmComponentProps<{
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
