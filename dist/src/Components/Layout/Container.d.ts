/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare const CONTAINER_CLASSES: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
};
export type ContainerProps = RbmComponentProps<{
    fluid?: boolean | keyof typeof CONTAINER_CLASSES;
}>;
declare function Container({ fluid, className, children, style }: ContainerProps): JSX.Element;
declare const ContainerMemo: typeof Container;
export { ContainerMemo as Container };
