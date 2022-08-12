/// <reference types="react" />
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';
import { Listener, OptionalListener } from '../Hooks/useListener';
declare type WithoutActionProps<DismissedData> = {
    timeToShow?: number;
} & OptionalListener<'onDismissed', DismissedData>;
declare type WithActionProps<ActionData, DismissedData> = WithoutActionProps<DismissedData> & {
    actionName: string;
} & Listener<'onClick', ActionData>;
export declare type ToastProps<ActionData, DismissedData> = RbmComponentProps<WithActionProps<ActionData, DismissedData> | WithoutActionProps<DismissedData>, WithNoStringAndChildrenProps>;
declare function Toast<ActionData, DismissedData>({ className, timeToShow, children, ...otherProps }: ToastProps<ActionData, DismissedData>): JSX.Element | null;
declare const ToastMemo: typeof Toast;
export { ToastMemo as Toast };
