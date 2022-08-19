/// <reference types="react" />
import { RbmComponentProps, WithStringProps } from '../RbmComponentProps';
export declare type HeadingProps = RbmComponentProps<{}, WithStringProps>;
declare function Heading({ children }: HeadingProps): JSX.Element;
declare const HeadingMemo: typeof Heading;
export { HeadingMemo as Heading };
