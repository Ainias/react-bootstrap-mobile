import { CSSProperties, ReactNode } from 'react';
import { Recursive } from '../TypeHelpers';

type Child = Recursive<JSX.Element | undefined | null | Child[]> | false;
export type WithNoStringProps =
    | {
          children?: Child;
          __allowChildren?: 'html';
      }
    | {
          children?: ReactNode;
          __allowChildren: 'text' | 'all';
      };

export type WithNoStringAndChildrenProps =
    | {
          children: Child;
          __allowChildren?: 'html';
      }
    | {
          children: ReactNode;
          __allowChildren: 'text' | 'all';
      };

export type WithStringProps = {
    children?: Recursive<string>;
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
