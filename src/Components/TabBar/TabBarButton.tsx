import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { NavLink } from 'react-bootstrap';
import { prefixClass } from '../../helper';

export type TabBarButtonProps = RbmComponentProps<{
    active: boolean;
    index: number;
}>;

let TabBarButton = function TabBarButton({ active, index, className, children, ...rbmProps }: TabBarButtonProps) {
    // Variables
    const classes = ['tabBar-button'];
    if (active) classes.push('tabBar-button-active');

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <NavLink {...rbmProps} className={prefixClass(classes, className)} eventKey={index}>
            {children}
        </NavLink>
    );
};
TabBarButton = React.memo(TabBarButton) as typeof TabBarButton;
export { TabBarButton };
