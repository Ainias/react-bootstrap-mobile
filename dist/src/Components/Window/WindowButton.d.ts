import { MouseEvent } from 'react';
import { IconSource } from '../Icon/Icon';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { Listener } from '../Hooks/useListener';
import type { WindowState } from './Window';
export declare type WindowButtonProps<OnClickData> = RbmComponentProps<{
    icon: IconSource;
    title?: string;
    windowState?: WindowState;
    hideWhenMaximized?: boolean;
    hideWhenMinimized?: boolean;
} & Listener<'onClick', OnClickData, MouseEvent>, WithNoChildren>;
declare function WindowButton<OnClickData>({ icon, title, windowState, hideWhenMaximized, hideWhenMinimized, ...listenerProps }: WindowButtonProps<OnClickData>): JSX.Element | null;
declare const WindowButtonMemo: typeof WindowButton;
export { WindowButtonMemo as WindowButton };
