import * as React from 'react';
import { ComponentPropsWithoutRef, useCallback, useEffect, useMemo, useRef } from 'react';
import { Override } from '../../TypeHelpers';
import { withMemo } from '../../helper/withMemo';
import { useWindow } from '../../WindowContext/WindowContext';
import { RbmComponentProps } from '../RbmComponentProps';
import { JSX } from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export type FullScreenProps<AsType extends keyof IntrinsicElements> = RbmComponentProps<
    Override<
        ComponentPropsWithoutRef<AsType>,
        { as?: AsType; fullscreenKey?: string; onEnterFullscreen?: () => void; onLeaveFullscreen?: () => void }
    >
>;

export const FullScreen = withMemo(function FullScreen<AsTag extends keyof JSX.IntrinsicElements = 'span'>({
                                                                                                               children,
                                                                                                               as,
                                                                                                               fullscreenKey,
                                                                                                               onEnterFullscreen,
                                                                                                               onLeaveFullscreen,
                                                                                                               ...otherProps
                                                                                                           }: FullScreenProps<AsTag>) {
    // Variables

    // Refs
    const containerRef = useRef<HTMLElement>(null);
    const window = useWindow();

    // States

    // Selectors

    // Callbacks
    const toggleFullscreen = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
        if (fullscreenElement === containerRef.current) {
            if ('exitFullscreen' in document) {
                document.exitFullscreen();
            } else {
                // @ts-expect-error this is not in the types but it exists
                document.webkitCancelFullScreen();
            }
                return;
        }

        if ('webkitRequestFullscreen' in document.body) {
            // @ts-expect-error this is not in the types but it exists
            containerRef.current?.webkitRequestFullscreen();
        } else {
            containerRef.current?.requestFullscreen();
        }
    }, []);

    // Effects
    useEffect(() => {
        if (!fullscreenKey) {
            return undefined;
        }
        const listener = (e: KeyboardEvent) => {
            if (e.key === fullscreenKey) {
                toggleFullscreen();
            }
        };
        window?.addEventListener('keyup', listener);
        return () => window?.removeEventListener('keyup', listener);
    }, [fullscreenKey, toggleFullscreen, window]);

    useEffect(() => {
        if (!containerRef.current) {
            return undefined;
        }

        const container = containerRef.current;
        const listener = () => {
            // @ts-expect-error the typing is not completely correct
            const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
            if (fullscreenElement === container) {
                onEnterFullscreen?.();
            } else {
                onLeaveFullscreen?.();
            }
        };
        container.addEventListener('fullscreenchange', listener);
        container.addEventListener('webkitfullscreenchange', listener);

        return () => {
            container.removeEventListener('fullscreenchange', listener);
            container.removeEventListener('webkitfullscreenchange', listener);
        };
    }, [onEnterFullscreen, onLeaveFullscreen]);

    // Other

    // Render Functions
    const element = as ?? 'span';
    const props = useMemo(() => ({...otherProps, ref: containerRef}), [otherProps]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return React.createElement(element, props, children);
});

