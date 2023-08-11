import { CSSProperties, ReactNode } from 'react';
import { Recursive } from '../TypeHelpers';
export type RbmChildWithoutString = Recursive<JSX.Element | undefined | null | RbmChildWithoutString[]> | false;
export type WithNoStringProps = {
    children?: RbmChildWithoutString;
    __allowChildren?: 'html';
} | {
    children?: ReactNode;
    __allowChildren: 'text' | 'all';
};
export type WithNoStringAndChildrenProps = {
    children: RbmChildWithoutString;
    __allowChildren?: 'html';
} | {
    children: ReactNode;
    __allowChildren: 'text' | 'all';
};
export type WithStringProps = {
    children?: Recursive<string>;
};
export type WithChildren = {
    children: ReactNode;
    __allowChildren?: "text" | "all" | "html";
};
export type WithStringAndChildrenProps = {
    children: Recursive<string>;
};
export type WithNoChildren = {
    children?: never;
};
export type RbmComponentProps<SpecialProps, ChildrenProps = WithNoStringProps> = ChildrenProps & {
    className?: string;
    style?: CSSProperties;
} & SpecialProps;
