import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps } from '../RbmComponentProps';
import classNames from 'classnames';

import styles from './container.scss';

export const CONTAINER_CLASSES = {
    sm: styles['container-sm'],
    md: styles['container-md'],
    lg: styles['container-lg'],
    xl: styles['container-xl'],
    xxl: styles['container-xxl'],
};

export type ContainerProps = RbmComponentProps<{
    fluid?: boolean | keyof typeof CONTAINER_CLASSES;
}>;

export const Container = withMemo(function Container({ fluid, className, children, style }: ContainerProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    const containerClass = typeof fluid === 'string' ? CONTAINER_CLASSES[fluid] : '';
    return (
        <div
            className={classNames(
                {
                    [styles.container]: fluid === false,
                    [styles.containerFluid]: fluid === true,
                },
                containerClass,
                className
            )}
            style={style}
        >
            {children}
        </div>
    );
}, styles);
