import { PropsWithChildren } from 'react';

export type RbmComponentProps<SpecialProps> = PropsWithChildren<
    {
        className?: string;
    } & SpecialProps
>;
