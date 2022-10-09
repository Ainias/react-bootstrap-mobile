import { ForwardRefRenderFunction, PropsWithoutRef, ReactElement, RefAttributes } from 'react';
import { RESTRICT_CHILDREN } from './withRestrictedChildren';
export interface RefComponent<PropTypes, ForwardedRefType> {
    (props: PropsWithoutRef<PropTypes> & RefAttributes<ForwardedRefType>): ReactElement | null;
    displayName?: string | undefined;
}
export declare function withForwardRef<PropTypes, ForwardedRefType>(component: ForwardRefRenderFunction<ForwardedRefType, PropTypes>, styles?: any, defaultAllowChildren?: typeof RESTRICT_CHILDREN['allowChildren']): RefComponent<PropTypes, ForwardedRefType>;
