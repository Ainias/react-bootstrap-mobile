/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare type CardProps = RbmComponentProps<{
    title?: string;
    fullHeight?: boolean;
    noPaddingHeight?: boolean;
    noPaddingWidth?: boolean;
    noPadding?: boolean;
    noMargin?: boolean;
}>;
declare function Card({ title, children, fullHeight, noPaddingHeight, noPadding, noPaddingWidth, noMargin, className, ...rbmProps }: CardProps): JSX.Element;
declare const CardMemo: typeof Card;
export { CardMemo as Card };
