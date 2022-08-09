import { ReactNode } from 'react';
declare type Child = JSX.Element | undefined | null | Child[];
declare type WithNoStringProps<Props> = ({
    children?: Child;
    __allowChildren?: 'html';
} | {
    children?: ReactNode;
    __allowChildren: 'text' | 'all';
}) & Props;
export declare type RbmComponentProps<SpecialProps> = WithNoStringProps<{
    className?: string;
} & SpecialProps>;
export {};
