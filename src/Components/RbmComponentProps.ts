import { ReactNode } from 'react';
import { Recursive } from '../TypeHelpers';

type Child = Recursive<JSX.Element | undefined | null | Child[]>;
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

export type RbmComponentProps<SpecialProps, ChildrenProps = WithNoStringProps> = ChildrenProps & {
    className?: string;
} & SpecialProps;
