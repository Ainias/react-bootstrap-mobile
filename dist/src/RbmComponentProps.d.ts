import { PropsWithChildren } from 'react';
import { Override } from './TypeHelpers';
export declare type RbmComponentProps<SpecialProps> = PropsWithChildren<Override<{
    className?: string;
}, SpecialProps>>;
