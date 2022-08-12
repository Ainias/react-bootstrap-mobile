import { ComponentType } from 'react';
import { RbmComponentProps } from '../Components/RbmComponentProps';
export declare const RESTRICT_CHILDREN: {
    allowChildren: "html" | "text" | "all" | undefined;
};
export declare function withRestrictedChildren<C extends ComponentType<RbmComponentProps<Record<string, any>>>>(Component: C, defaultAllowChildren?: typeof RESTRICT_CHILDREN['allowChildren']): C;
