import * as React from 'react';
import { ComponentRef, DOMAttributes, ReactElement, RefAttributes } from 'react';
import { ViewProps } from './View';
export type ViewWithoutListenersProps<AsType extends keyof JSX.IntrinsicElements> = Omit<ViewProps<AsType>, keyof DOMAttributes<AsType>> & {
    children?: React.ReactNode;
};
declare const ViewWithoutListenersMemo: <AsType extends keyof JSX.IntrinsicElements>(props: ViewWithoutListenersProps<AsType> & RefAttributes<ComponentRef<AsType>>) => ReactElement | null;
export { ViewWithoutListenersMemo as ViewWithoutListeners };
