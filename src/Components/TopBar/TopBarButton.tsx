import * as React from 'react';
import { useCallback } from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './topBar.scss';
import classNames from 'classnames';
import { withMemo } from '../../helper/withMemo';

export type TopBarButtonProps = RbmComponentProps<{
    disabled?: boolean;
    onClick?: () => void;
}>;

function TopBarButton({ disabled = false, onClick, className, children, ...rbmProps }: TopBarButtonProps) {
    const cb = useCallback(() => (onClick ? onClick() : null), [onClick]);
    return (
        <a
            role="button"
            {...rbmProps}
            onClick={cb}
            className={classNames(styles.button, { [styles.disabled]: disabled }, className)}
        >
            {children}
        </a>
    );
}

const TopBarButtonMemo = withMemo(TopBarButton, styles);
export { TopBarButtonMemo as TopBarButton };
