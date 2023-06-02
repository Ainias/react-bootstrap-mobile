import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { ReactElement } from 'react';
export type CardProps = RbmComponentProps<{
    title?: string | ReactElement;
    fullHeight?: boolean;
    noPaddingHeight?: boolean;
    noPaddingWidth?: boolean;
    noPadding?: boolean;
    noMargin?: boolean;
}>;
declare function Card({ title, children, fullHeight, noPaddingHeight, noPadding, noPaddingWidth, noMargin, className, ...rbmProps }: CardProps): React.JSX.Element;
declare const CardMemo: typeof Card;
export { CardMemo as Card };
