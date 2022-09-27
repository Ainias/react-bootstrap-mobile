/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
import { EmptyProps } from '../../helper/EmptyProps';
export declare type ToastContainerProps = RbmComponentProps<EmptyProps>;
declare function ToastContainer({ className, children, style }: ToastContainerProps): JSX.Element;
declare const ToastContainerMemo: typeof ToastContainer;
export { ToastContainerMemo as ToastContainer };
