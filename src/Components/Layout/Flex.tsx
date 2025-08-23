import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import styles from './layout.scss';
import classNames from 'classnames';
import { ViewWithoutListeners, ViewWithoutListenersProps } from './ViewWithoutListeners';
import { withMemo } from "../../helper/withMemo";
import { JSX } from "react/jsx-runtime";
import IntrinsicElements = JSX.IntrinsicElements;

export type FlexProps<AsType extends keyof IntrinsicElements> = RbmComponentProps<
    ViewWithoutListenersProps<AsType> & {
        horizontal?: boolean;
        grow?: boolean;
    }
>;

export const Flex = withMemo(function Flex<AsType extends keyof JSX.IntrinsicElements = 'div'>(
    { children, as = 'div' as AsType, className, horizontal = false, ref, grow = false, ...props }: FlexProps<AsType>
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
            className={classNames(className, styles.flex, {
                [styles.horizontal]: horizontal,
                [styles.grow]: grow,
                [styles.weight1]: grow,
            })}
            as={as as AsType}
            ref={ref}
            {...(props as ViewWithoutListenersProps<AsType>)}
        >
            {children}
        </ViewWithoutListeners>
    );
}, styles);
