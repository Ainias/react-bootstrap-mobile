import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Listener } from '../Hooks/useListener';
export type TabBarButtonProps = RbmComponentProps<{
    active: boolean;
} & Listener<'onClick', number>>;
declare function TabBarButton({ active, className, children, ...rbmProps }: TabBarButtonProps): React.JSX.Element;
declare const TabBarButtonMemo: typeof TabBarButton;
export { TabBarButtonMemo as TabBarButton };
