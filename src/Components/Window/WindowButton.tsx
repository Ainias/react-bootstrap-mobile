import * as React from 'react';
import { MouseEvent } from 'react';
import { withMemo } from '../../helper/withMemo';
import { Clickable } from '../Clickable/Clickable';
import { Icon, IconSource } from '../Icon/Icon';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';

import styles from './windowButton.scss';
import { Listener, useListener } from '../Hooks/useListener';
import type { WindowState } from './Window';

export type WindowButtonProps<OnClickData> = RbmComponentProps<
    {
        icon: IconSource;
        title?: string;
        windowState?: WindowState;
        hideWhenMaximized?: boolean;
        hideWhenMinimized?: boolean;
    } & Listener<'onClick', OnClickData, MouseEvent>,
    WithNoChildren
>;

function WindowButton<OnClickData>({
    icon,
    title,
    windowState,
    hideWhenMaximized,
    hideWhenMinimized,
    ...listenerProps
}: WindowButtonProps<OnClickData>) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks
    const onClick = useListener('onClick', listenerProps);

    // Effects

    // Other

    // Render Functions
    if (hideWhenMaximized && windowState === 'maximized') {
        return null;
    }
    if (hideWhenMinimized && windowState === 'minimized') {
        return null;
    }

    return (
        <Clickable onClick={onClick} className={styles.windowButton}>
            <Icon icon={icon} title={title} />
        </Clickable>
    );
}

// Need WindowButtonMemo for autocompletion of phpstorm
const WindowButtonMemo = withMemo(WindowButton, styles);
export { WindowButtonMemo as WindowButton };
