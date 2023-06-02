import * as React from 'react';
import { RbmComponentProps, WithStringProps } from '../RbmComponentProps';
import { EmptyProps } from '../../helper/EmptyProps';
export type HeadingProps = RbmComponentProps<EmptyProps, WithStringProps>;
declare function Heading({ children, className, style }: HeadingProps): React.JSX.Element;
declare const HeadingMemo: typeof Heading;
export { HeadingMemo as Heading };
