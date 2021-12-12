/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare type FlexProps = RbmComponentProps<{
    vertical?: boolean;
}>;
declare function Flex({ className, children, vertical }: FlexProps): JSX.Element;
declare const tmp: typeof Flex;
export { tmp as Flex };
