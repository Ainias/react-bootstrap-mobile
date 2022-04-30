import * as React from 'react';
import { FunctionComponent, useCallback } from 'react';
import { NavLink } from 'react-bootstrap';
import { RbmComponentProps } from '../RbmComponentProps';

type Props = RbmComponentProps<{
    disabled?: boolean;
    onClick?: () => void;
}>;

export const TopBarButton: FunctionComponent<Props> = React.memo(
    ({ disabled = false, onClick, children, ...rbmProps }) => {
        const cb = useCallback(() => (onClick ? onClick() : null), [onClick]);
        return (
            <NavLink {...rbmProps} onClick={cb} disabled={disabled}>
                {children}
            </NavLink>
        );
    }
);
