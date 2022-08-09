/// <reference types="react" />
import { Recursive, ValueOf } from '../../TypeHelpers';
export declare const TEXT_PRIO: {
    primary: string;
    secondary: string;
};
export declare const TEXT_SIZE: {
    medium: string;
    small: string;
};
export declare type TextProps = {
    block?: boolean;
    prio?: ValueOf<typeof TEXT_PRIO>;
    size?: ValueOf<typeof TEXT_SIZE>;
    className?: string;
    children: Recursive<string | undefined | null | number>;
};
declare function Words({ className, children, block, prio, size }: TextProps): JSX.Element;
declare const tmp: typeof Words;
export { tmp as Words };
