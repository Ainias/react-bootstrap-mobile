import * as React from 'react';
import { ComponentRef, PropsWithChildren, ReactElement, RefAttributes } from 'react';
import { Override } from '../../TypeHelpers';
export type ViewProps<AsType extends keyof JSX.IntrinsicElements> = PropsWithChildren<Override<React.ComponentPropsWithoutRef<AsType>, {
    as?: AsType;
    children?: React.ReactNode;
}>>;
declare const ViewMemo: <AsType extends keyof JSX.IntrinsicElements>(props: ViewProps<AsType> & RefAttributes<ComponentRef<AsType>>) => ReactElement | null;
export { ViewMemo as View };
