/// <reference types="react" />
import { ViewProps } from './View';
import { RbmComponentProps } from '../RbmComponentProps';
export declare type InlineProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<ViewProps<AsType>>;
declare function Inline<AsType extends keyof JSX.IntrinsicElements = 'span'>({ children, as, className, ...props }: InlineProps<AsType>): JSX.Element;
declare const InlineMemo: typeof Inline;
export { InlineMemo as Inline };
