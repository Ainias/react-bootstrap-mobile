import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Container } from '../Layout/Container';

import styles from './toast.scss';
import classNames from 'classnames';
import { withMemo } from '../../helper/withMemo';
import { EmptyProps } from '../../helper/EmptyProps';

export type ToastContainerProps = RbmComponentProps<EmptyProps>;

function ToastContainer({ className, children, style }: ToastContainerProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Container className={classNames(styles.toastContainer, className)} fluid __allowChildren="all" style={style}>
            {children}
        </Container>
    );
}

const ToastContainerMemo = withMemo(ToastContainer, styles);
export { ToastContainerMemo as ToastContainer };
