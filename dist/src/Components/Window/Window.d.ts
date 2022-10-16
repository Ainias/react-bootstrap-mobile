import { WindowButtonProps } from './WindowButton';
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';
export declare type WindowButtonData = WindowButtonProps<any> & {
    key: string;
};
export declare type WindowState = 'normal' | 'minimized' | 'maximized' | 'popup';
export declare type WindowProps = RbmComponentProps<{
    title?: string;
    className?: string;
    initialTop?: number;
    initialLeft?: number;
    fillHeight?: boolean;
    id?: string;
    isActive?: boolean;
    onActive?: (_: any, id?: string) => void;
    defaultWidth?: number;
    buttons?: WindowButtonData[] | ((state: WindowState, defaultButtons: WindowButtonData[]) => WindowButtonData[]);
}, WithNoStringAndChildrenProps>;
export declare type WindowRef = {
    minimize(): void;
    maximize(): void;
    toggleMinimize(): void;
    toggleMaximize(): void;
    resizeToContent(): void;
    openInNewWindow(): void;
};
declare const WindowMemo: import("../../helper/withForwardRef").RefComponent<WindowProps, WindowRef>;
export { WindowMemo as Window };
