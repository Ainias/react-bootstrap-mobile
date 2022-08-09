import { ForwardRefRenderFunction, PropsWithoutRef, ReactElement, RefAttributes } from 'react';
export interface RefComponent<PropTypes, ForwardedRefType> {
    (props: PropsWithoutRef<PropTypes> & RefAttributes<ForwardedRefType>): ReactElement | null;
    displayName?: string | undefined;
}
export declare function withForwardRef<PropTypes, ForwardedRefType>(component: ForwardRefRenderFunction<ForwardedRefType, PropTypes>, styles?: any): RefComponent<PropTypes, ForwardedRefType>;
