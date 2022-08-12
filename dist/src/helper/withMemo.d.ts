import { ComponentType } from 'react';
import { RESTRICT_CHILDREN } from './withRestrictedChildren';
export declare function withMemo<C extends ComponentType<any>>(component: C, styles?: any, defaultAllowChildren?: typeof RESTRICT_CHILDREN['allowChildren']): C;
