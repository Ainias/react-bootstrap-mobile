import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './layout.scss';
import classNames from 'classnames';
import { View, ViewProps } from './View';
import { ComponentRef, ForwardedRef } from 'react';
import { withForwardRef } from '../../helper/withForwardRef';

export type FlexProps<AsType extends keyof JSX.IntrinsicElements> = RbmComponentProps<
    ViewProps<AsType> & {
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
        <View
            className={classNames(
                styles.flex,
                {
                    [styles.horizontal]: horizontal,
                    [styles.grow]: grow,
                },
                className
            )}
            as={as}
            ref={ref}
            {...(props as ViewProps<AsType>)}
        >
            {children}
        </View>
    );
}

const tmp = withForwardRef(Flex, styles);
export { tmp as Flex };
