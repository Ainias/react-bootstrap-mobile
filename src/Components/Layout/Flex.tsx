import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './layout.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

export type FlexProps = RbmComponentProps<{
    vertical?: boolean;
}>;

function Flex({ className, children, vertical = false }: FlexProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return <div className={classNames(styles.flex, { [styles.vertical]: vertical }, className)}>{children}</div>;
}

const tmp = withMemo(Flex, styles);
export { tmp as Flex };
