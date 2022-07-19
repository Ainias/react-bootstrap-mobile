import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { NavLink } from 'react-bootstrap';

import styles from './tabBar.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

export type TabBarButtonProps = RbmComponentProps<{
    active: boolean;
    index: number;
}>;

function TabBarButton({ active, index, className, children, ...rbmProps }: TabBarButtonProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <NavLink
            {...rbmProps}
            className={classNames(styles.button, { [styles.buttonActive]: active, className })}
            eventKey={index}
        >
            {children}
        </NavLink>
    );
}

const TabBarButtonMemo = withMemo(TabBarButton, styles);
export { TabBarButtonMemo as TabBarButton };
