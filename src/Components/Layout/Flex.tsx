import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './layout.scss';
import classNames from 'classnames';
import { ComponentRef, ForwardedRef } from 'react';
import { withForwardRef } from '../../helper/withForwardRef';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';

export type FlexProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType> & {
        horizontal?: boolean;
        grow?: boolean;
    }
>;

function Flex<AsType extends keyof JSX.IntrinsicElements = 'div'>(
    { children, as = 'div' as AsType, className, horizontal = false, grow = false, ...props }: FlexProps<AsType>,
    ref?: ForwardedRef<ComponentRef<AsType>>
) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <ViewWithoutListeners
            className={classNames(
                styles.flex,
                {
                    [styles.horizontal]: horizontal,
                    [styles.grow]: grow,
                },
                className
            )}
            as={as as AsType}
            ref={ref}
            {...(props as ViewWithoutListenersProps<AsType>)}
        >
            {children}
        </ViewWithoutListeners>
    );
}

const tmp = withForwardRef(Flex, styles);
export { tmp as Flex };
