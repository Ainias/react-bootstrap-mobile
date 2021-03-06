import * as React from 'react';
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react';
import { Override } from '../../TypeHelpers';

export type FullScreenProps<AsType, AsProps> = PropsWithChildren<
    Override<
        AsProps,
        { as?: AsType; fullscreenKey?: string; onEnterFullscreen?: () => void; onLeaveFullscreen?: () => void }
    >
>;

function FullScreen<
    AsTag extends keyof JSX.IntrinsicElements = 'span',
    // eslint-disable-next-line @typescript-eslint/ban-types
    AsTagProps extends JSX.IntrinsicElements[AsTag] = {}
>({
    children,
    as,
    fullscreenKey,
    onEnterFullscreen,
    onLeaveFullscreen,
    ...otherProps
}: FullScreenProps<AsTag, AsTagProps & JSX.IntrinsicAttributes>) {
    // Variables

    // Refs
    const containerRef = useRef<HTMLElement>(null);

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
const FullScreenMemo = React.memo(FullScreen) as typeof FullScreen;
export { FullScreenMemo as FullScreen };
