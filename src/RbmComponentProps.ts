import { PropsWithChildren } from 'react';
import { Override } from './TypeHelpers';

export type RbmComponentProps<SpecialProps> = PropsWithChildren<
    Override<
        {
            className?: string;
        },
        SpecialProps
    >
>;
