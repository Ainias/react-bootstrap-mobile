import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Container } from '../Layout/Container';

import styles from './toast.scss';
import classNames from 'classnames';
import { withMemo } from '../../helper/withMemo';

export type ToastContainerProps = RbmComponentProps<{}>;

function ToastContainer({ className, children }: ToastContainerProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Container className={classNames(styles.toastContainer, className)} fluid __allowChildren="all">
            {children}
        </Container>
    );
}

const ToastContainerMemo = withMemo(ToastContainer, styles);
export { ToastContainerMemo as ToastContainer };