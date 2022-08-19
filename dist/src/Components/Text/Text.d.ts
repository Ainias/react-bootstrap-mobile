/// <reference types="react" />
import { Recursive, ValueOf } from '../../TypeHelpers';
import { ViewProps } from '../Layout/View';
export declare const TEXT_PRIO: {
    primary: string;
    secondary: string;
    heading: string;
};
export declare const TEXT_SIZE: {
    small: string;
    medium: string;
    large: string;
    xlarge: string;
    xxlarge: string;
};
export declare type TextProps<AsType extends keyof JSX.IntrinsicElements> = {
    block?: boolean;
    prio?: ValueOf<typeof TEXT_PRIO>;
    size?: ValueOf<typeof TEXT_SIZE>;
    className?: string;
    children: Recursive<string | undefined | null | number>;
} & ViewProps<AsType>;
declare function Text<AsType extends keyof JSX.IntrinsicElements = 'span'>({ className, children, block, prio, size, as, ...props }: TextProps<AsType>): JSX.Element;
declare const tmp: typeof Text;
export { tmp as Text };
