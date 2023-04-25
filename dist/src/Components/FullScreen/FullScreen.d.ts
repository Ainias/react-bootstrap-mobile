import * as React from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { Override } from '../../TypeHelpers';
import { RbmComponentProps } from '../RbmComponentProps';
export type FullScreenProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<Override<ComponentPropsWithoutRef<AsType>, {
    as?: AsType;
    fullscreenKey?: string;
    onEnterFullscreen?: () => void;
    onLeaveFullscreen?: () => void;
}>>;
declare function FullScreen<AsTag extends keyof JSX.IntrinsicElements = 'span'>({ children, as, fullscreenKey, onEnterFullscreen, onLeaveFullscreen, ...otherProps }: FullScreenProps<AsTag>): React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
declare const FullScreenMemo: typeof FullScreen;
export { FullScreenMemo as FullScreen };
