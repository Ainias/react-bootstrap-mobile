import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './tabBar.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';
import { Listener, useListenerWithExtractedProps } from '../Hooks/useListener';

export type TabBarButtonProps = RbmComponentProps<
    {
        active: boolean;
    } & Listener<'onClick', number>
>;

function TabBarButton({ active, className, children, ...rbmProps }: TabBarButtonProps) {
    // Variables

    // States

    // Refs

    // Callbacks
    const [onClick, otherProps] = useListenerWithExtractedProps<'onClick', number>('onClick', rbmProps);

    // Effects

    // Other

    // Render Functions

    return (
        <a
            {...otherProps}
            role="button"
            onClick={onClick}
            className={classNames(styles.button, { [styles.buttonActive]: active, className })}
        >
            {children}
        </a>
    );
}

const TabBarButtonMemo = withMemo(TabBarButton, styles);
export { TabBarButtonMemo as TabBarButton };
