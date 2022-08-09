import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
import { ComponentType } from 'react';
export declare type TabBarComponentButtonType = {
    component: ComponentType<Record<string, any>>;
    key?: string;
};
export declare type TabBarTitleButtonType = {
    title: string;
    icon?: IconSource;
    key?: string;
};
export declare type TabBarIconButtonType = {
    title?: string;
    icon: IconSource;
    key?: string;
};
export declare type TabBarButtonType = TabBarComponentButtonType | TabBarTitleButtonType | TabBarIconButtonType;
export declare type TabBarProps = RbmComponentProps<{
    buttons: TabBarButtonType[];
    startActiveTab?: number;
    onTabChange: (newActiveTab: number) => void;
    activeTab?: number;
    transparent?: boolean;
    drawBehind?: boolean;
    underline?: boolean;
}>;
declare function TabBar({ buttons, startActiveTab, onTabChange, activeTab, transparent, underline, className, ...rbmProps }: TabBarProps): JSX.Element;
declare const TabBarMemo: typeof TabBar;
export { TabBarMemo as TabBar };
