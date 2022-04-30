import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';
import { Container } from 'react-bootstrap';

export type ToastContainerProps = RbmComponentProps<{}>;

let ToastContainer = function ToastContainer({ className, children }: ToastContainerProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Container className={prefixClass('toast-container', className)} fluid>
            {children}
        </Container>
    );
};
ToastContainer = React.memo(ToastContainer) as typeof ToastContainer;
export { ToastContainer };
