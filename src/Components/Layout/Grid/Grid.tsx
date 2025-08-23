import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Block } from '../Block';
import classNames from 'classnames';
import styles from './grid.scss';
import { ForwardedRef, useMemo } from 'react';
import { withMemo } from "../../../helper/withMemo";

export type GridProps = RbmComponentProps<{
    columns?: number;
    rows?: number;
    useContainerWidth?: boolean;
    ref?:ForwardedRef<HTMLDivElement>
}>;

export const Grid = withMemo(function Grid({ style, children, columns = 12, rows = 1, useContainerWidth = false,ref,  className, __allowChildren }: GridProps) {
    // Variables
    const appliedStyle = useMemo(
        () => ({
            ...style,
            '--grid-columns': columns,
            '--grid-rows': rows,
        }),
        [style, columns, rows]
    );

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Block
            ref={ref}
            style={appliedStyle}
            className={classNames(styles.grid, className, {[styles.useContainerWidth]: useContainerWidth})}
            __allowChildren={__allowChildren as 'all'}
        >
            {children}
        </Block>
    );
}, styles);
