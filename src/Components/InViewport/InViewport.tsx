import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';
import { useEffect, useRef, useState } from 'react';

export type InViewportProps = RbmComponentProps<{
    threshold?: number;
    onInViewportChange: (isInViewport: boolean) => void;
    root?: HTMLElement;
    rootMargin?: string;
}>;

let InViewport = function InViewport({
    threshold = 0,
    root,
    rootMargin,
    onInViewportChange,
    className,
    children,
}: InViewportProps) {
    // Variables

    // States
    const [intersectionObserver, setIntersectionObserver] = useState<IntersectionObserver>();

    // Refs
    const viewportElement = useRef<HTMLSpanElement>(null);

    // Callbacks

    // Effects
    useEffect(() => {
        setIntersectionObserver((oldObserver) => {
            oldObserver?.disconnect();

            return new IntersectionObserver(
                (entries) => {
                    onInViewportChange(entries[0].isIntersecting);
                },
                {
                    threshold: [threshold],
                    root,
                    rootMargin,
                }
            );
        });
    }, [onInViewportChange, threshold, root, rootMargin]);

    useEffect(() => {
        if (intersectionObserver && viewportElement.current) {
            intersectionObserver.observe(viewportElement.current);
        }
    }, [intersectionObserver, viewportElement]);

    // Other

    // Render Functions

    return (
        <span ref={viewportElement} className={prefixClass('in-viewport', className)}>
            {children}
        </span>
    );
};
InViewport = React.memo(InViewport) as typeof InViewport;
export { InViewport };
