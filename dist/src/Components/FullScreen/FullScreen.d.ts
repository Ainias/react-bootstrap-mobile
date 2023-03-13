import * as React from 'react';
import { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import { Override } from '../../TypeHelpers';
export type FullScreenProps<AsType extends keyof JSX.IntrinsicElements> = PropsWithChildren<Override<ComponentPropsWithoutRef<AsType>, {
    as?: AsType;
    fullscreenKey?: string;
    onEnterFullscreen?: () => void;
    onLeaveFullscreen?: () => void;
}>>;
declare function FullScreen<AsTag extends keyof JSX.IntrinsicElements = 'span'>({ children, as, fullscreenKey, onEnterFullscreen, onLeaveFullscreen, ...otherProps }: FullScreenProps<AsTag>): React.ReactElement<Omit<FullScreenProps<AsTag>, "children" | "as" | "fullscreenKey" | "onEnterFullscreen" | "onLeaveFullscreen"> & {
    ref: React.RefObject<React.ComponentRef<AsTag>>;
}, string | React.JSXElementConstructor<any>>;
declare const FullScreenMemo: typeof FullScreen;
export { FullScreenMemo as FullScreen };
