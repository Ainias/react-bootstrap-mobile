/// <reference types="react" />
import { ViewProps } from './View';
import { RbmComponentProps } from '../RbmComponentProps';
export declare type InlineBlockProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<ViewProps<AsType>>;
declare function InlineBlock<AsType extends keyof JSX.IntrinsicElements = 'span'>({ children, as, className, ...props }: InlineBlockProps<AsType>): JSX.Element;
declare const InlineBlockMemo: typeof InlineBlock;
export { InlineBlockMemo as InlineBlock };
