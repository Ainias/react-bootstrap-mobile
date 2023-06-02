import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { EmptyProps } from '../../helper/EmptyProps';
export type ToastContainerProps = RbmComponentProps<EmptyProps>;
declare function ToastContainer({ className, children, style }: ToastContainerProps): React.JSX.Element;
declare const ToastContainerMemo: typeof ToastContainer;
export { ToastContainerMemo as ToastContainer };
