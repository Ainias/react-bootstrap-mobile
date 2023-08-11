import * as React from 'react';
import { withMemo } from '../../../helper/withMemo';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Block } from '../Block';
import classNames from 'classnames';

import styles from './grid.scss';
import { useMemo } from 'react';

export type GridProps = RbmComponentProps<{
    columns?: number;
    rows?: number;
    useContainerWidth?: boolean;
}>;

function Grid({ style, children, columns = 12, rows = 1, useContainerWidth = false, className, __allowChildren }: GridProps) {
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
            style={appliedStyle}
            className={classNames(styles.grid, className, {[styles.useContainerWidth]: useContainerWidth})}
            __allowChildren={__allowChildren as 'all'}
        >
            {children}
        </Block>
    );
}

// Need RowMemo for autocompletion of phpstorm
const GridMemo = withMemo(Grid, styles);
export { GridMemo as Grid };
