import * as React from 'react';
import {
    ComponentPropsWithoutRef,
    ComponentRef,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { Override } from '../../TypeHelpers';
import { withMemo } from '../../helper/withMemo';

export type FullScreenProps<AsType extends keyof JSX.IntrinsicElements> = PropsWithChildren<
    Override<
        ComponentPropsWithoutRef<AsType>,
        { as?: AsType; fullscreenKey?: string; onEnterFullscreen?: () => void; onLeaveFullscreen?: () => void }
    >
>;

function FullScreen<AsTag extends keyof JSX.IntrinsicElements = 'span'>({
    children,
    as,
    fullscreenKey,
    onEnterFullscreen,
    onLeaveFullscreen,
    ...otherProps
}: FullScreenProps<AsTag>) {
    // Variables

    // Refs
    const containerRef = useRef<ComponentRef<AsTag>>(null);

    // States

    // Selectors

    // Callbacks
    const toggleFullscreen = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if ('exitFullscreen' in document) {
                document.exitFullscreen();
            } else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                document.webkitCancelFullScreen();
            }
            onLeaveFullscreen?.();
            return;
        }
        if ('webkitRequestFullscreen' in document.body) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            containerRef.current?.webkitRequestFullscreen();
        } else {
            containerRef.current?.requestFullscreen();
        }
        onEnterFullscreen?.();
    }, [onEnterFullscreen, onLeaveFullscreen]);

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
        window.addEventListener('keyup', listener);
        return () => window.removeEventListener('keyup', listener);
    }, [fullscreenKey, toggleFullscreen]);

    // Other

    // Render Functions
    const element = as ?? 'span';
    const props = useMemo(() => ({ ...otherProps, ref: containerRef }), [otherProps]);
    return React.createElement(element, props, children);
}

// Need FullScreenMemo for autocompletion of phpstorm
const FullScreenMemo = withMemo(FullScreen);
export { FullScreenMemo as FullScreen };
