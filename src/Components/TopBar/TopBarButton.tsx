import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './topBar.scss';
import classNames from 'classnames';
import { withMemo } from '../../helper/withMemo';

export type TopBarButtonProps = RbmComponentProps<{
    disabled?: boolean;
    onClick?: () => void;
}>;

function TopBarButton({ disabled = false, onClick, className, children, ...rbmProps }: TopBarButtonProps) {
    return (
        <a
            role="button"
            {...rbmProps}
            onClick={onClick}
            className={classNames(styles.button, { [styles.disabled]: disabled, [styles.active]: !disabled && onClick }, className)}
        >
            {children}
        </a>
    );
}

const TopBarButtonMemo = withMemo(TopBarButton, styles);
export { TopBarButtonMemo as TopBarButton };
