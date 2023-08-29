import * as React from 'react';
import { Recursive, ValueOf } from '../../TypeHelpers';
import { ViewProps } from '../Layout/View';
export declare const TEXT_PRIO: {
    primary: string;
    secondary: string;
    tertiary: string;
    heading: string;
};
export declare const TEXT_SIZE: {
    xSmall: string;
    small: string;
    medium: string;
    large: string;
    xLarge: string;
    xxLarge: string;
};
export type TextProps<AsType extends keyof JSX.IntrinsicElements> = {
    block?: boolean;
    prio?: ValueOf<typeof TEXT_PRIO>;
    size?: ValueOf<typeof TEXT_SIZE>;
    className?: string;
    children: Recursive<string | undefined | null | number>;
} & ViewProps<AsType>;
declare function Text<AsType extends keyof JSX.IntrinsicElements = 'span'>({ className, children, block, prio, size, as, ...props }: TextProps<AsType>): React.JSX.Element;
declare const tmp: typeof Text;
export { tmp as Text };
