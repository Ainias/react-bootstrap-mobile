import { CSSProperties, ReactNode } from 'react';
import { Recursive } from '../TypeHelpers';
declare type Child = Recursive<JSX.Element | undefined | null | Child[]> | false;
export declare type WithNoStringProps = {
    children?: Child;
    __allowChildren?: 'html';
} | {
    children?: ReactNode;
    __allowChildren: 'text' | 'all';
};
export declare type WithNoStringAndChildrenProps = {
    children: Child;
    __allowChildren?: 'html';
} | {
    children: ReactNode;
    __allowChildren: 'text' | 'all';
};
export declare type WithStringProps = {
    children?: Recursive<string>;
};
export declare type WithStringAndChildrenProps = {
    children: Recursive<string>;
};
export declare type WithNoChildren = {
    children?: never;
};
export declare type RbmComponentProps<SpecialProps, ChildrenProps = WithNoStringProps> = ChildrenProps & {
    className?: string;
    style?: CSSProperties;
} & SpecialProps;
export {};
