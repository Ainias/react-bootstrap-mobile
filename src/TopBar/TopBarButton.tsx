import * as React from 'react';
import { FunctionComponent, useCallback } from 'react';
import { NavLink } from 'react-bootstrap';

type Props = {
    disabled?: boolean;
    onClick?: () => void;
};

export const TopBarButton: FunctionComponent<Props> = React.memo(({ disabled = false, onClick, children }) => {
    const cb = useCallback(() => (onClick ? onClick() : null), [onClick]);
    return (
        <NavLink onClick={cb} disabled={disabled}>
            {children}
        </NavLink>
    );
});
