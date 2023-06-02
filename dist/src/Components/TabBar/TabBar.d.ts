import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
import { ComponentType } from 'react';
export type TabBarComponentButtonType = {
    component: ComponentType<Record<string, any>>;
    key?: string;
};
export type TabBarTitleButtonType = {
    title: string;
    icon?: IconSource;
    key?: string;
};
export type TabBarIconButtonType = {
    title?: string;
    icon: IconSource;
    key?: string;
};
export type TabBarButtonType = TabBarComponentButtonType | TabBarTitleButtonType | TabBarIconButtonType;
export type TabBarProps = RbmComponentProps<{
    buttons: TabBarButtonType[];
    startActiveTab?: number;
    onTabChange: (newActiveTab: number) => void;
    activeTab?: number;
    transparent?: boolean;
    drawBehind?: boolean;
    underline?: boolean;
}>;
declare function TabBar({ buttons, startActiveTab, onTabChange, activeTab, transparent, underline, className, ...rbmProps }: TabBarProps): React.JSX.Element;
declare const TabBarMemo: typeof TabBar;
export { TabBarMemo as TabBar };
