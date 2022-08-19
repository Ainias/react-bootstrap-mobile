/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare type InViewportProps = RbmComponentProps<{
    threshold?: number;
    onInViewportChange: (isInViewport: boolean) => void;
    root?: HTMLElement;
    rootMargin?: string;
}>;
declare function InViewport({ threshold, root, rootMargin, onInViewportChange, className, children }: InViewportProps): JSX.Element;
declare const InViewportMemo: typeof InViewport;
export { InViewportMemo as InViewport };