import * as React from 'react';
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';
import { Listener, OptionalListener } from '../Hooks/useListener';
type WithoutActionProps<DismissedData> = {
    timeToShow?: number;
} & OptionalListener<'onDismissed', DismissedData>;
type WithActionProps<ActionData, DismissedData> = WithoutActionProps<DismissedData> & {
    actionName: string;
} & Listener<'onClick', ActionData>;
export type ToastProps<ActionData, DismissedData> = RbmComponentProps<WithActionProps<ActionData, DismissedData> | WithoutActionProps<DismissedData>, WithNoStringAndChildrenProps>;
declare function Toast<ActionData, DismissedData>({ className, timeToShow, children, style, ...otherProps }: ToastProps<ActionData, DismissedData>): React.JSX.Element | null;
declare const ToastMemo: typeof Toast;
export { ToastMemo as Toast };