import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Block } from '../Block';
import classNames from 'classnames';
import styles from './grid.scss';
import { ForwardedRef, useMemo } from 'react';
import { withForwardRef } from "../../../helper/withForwardRef";

export type GridProps = RbmComponentProps<{
    columns?: number;
    rows?: number;
    useContainerWidth?: boolean;
}>;

function Grid({ style, children, columns = 12, rows = 1, useContainerWidth = false, className, __allowChildren }: GridProps, ref?:ForwardedRef<HTMLDivElement>) {
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
}

// Need RowMemo for autocompletion of phpstorm
const GridMemo = withForwardRef(Grid, styles);
export { GridMemo as Grid };
