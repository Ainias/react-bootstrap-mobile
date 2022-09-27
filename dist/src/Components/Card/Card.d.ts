import { RbmComponentProps } from '../RbmComponentProps';
import { ReactElement } from 'react';
export declare type CardProps = RbmComponentProps<{
    title?: string | ReactElement;
    fullHeight?: boolean;
    noPaddingHeight?: boolean;
    noPaddingWidth?: boolean;
    noPadding?: boolean;
    noMargin?: boolean;
}>;
declare function Card({ title, children, fullHeight, noPaddingHeight, noPadding, noPaddingWidth, noMargin, className, ...rbmProps }: CardProps): JSX.Element;
declare const CardMemo: typeof Card;
export { CardMemo as Card };
