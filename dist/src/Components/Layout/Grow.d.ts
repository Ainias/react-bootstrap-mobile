import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export type GrowProps = RbmComponentProps<{
    center?: boolean;
    weight?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}>;
declare function Grow({ className, children, center, style, weight }: GrowProps): React.JSX.Element;
declare const tmp: typeof Grow;
export { tmp as Grow };
