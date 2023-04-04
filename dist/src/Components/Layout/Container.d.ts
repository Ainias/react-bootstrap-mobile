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
export declare const Container: ({ fluid, className, children, style }: ContainerProps) => JSX.Element;
