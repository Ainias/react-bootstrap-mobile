/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare type BodyProps = RbmComponentProps<{
    block?: boolean;
    prio?: 'primary' | 'secondary';
    size?: 'medium' | 'small' | 'large';
}>;
declare function Body({ className, children, block, prio, size }: BodyProps): JSX.Element;
declare const tmp: typeof Body;
export { tmp as Body };
