import { ReactNode } from 'react';

type Child = JSX.Element | undefined | null | Child[];
type WithNoStringProps<Props> = (
    | {
          children?: Child;
          __allowChildren?: 'html';
      }
    | {
          children?: ReactNode;
          __allowChildren: 'text' | 'all';
      }
) &
    Props;

export type RbmComponentProps<SpecialProps> = WithNoStringProps<
    {
        className?: string;
    } & SpecialProps
>;
