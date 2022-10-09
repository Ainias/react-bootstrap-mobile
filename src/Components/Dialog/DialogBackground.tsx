import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps } from '../RbmComponentProps';
import { Block } from '../Layout/Block';
import { EmptyProps } from '../../helper/EmptyProps';

import styles from './dialogBackground.scss';
import classNames from 'classnames';

export type DialogBackgroundProps = RbmComponentProps<EmptyProps>;

function DialogBackground({ children, className, style }: DialogBackgroundProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Block __allowChildren="all" className={classNames(styles.dialogBackground, className)} style={style}>
            {children}
        </Block>
    );
}

// Need DialogBackgroundMemo for autocompletion of phpstorm
const DialogBackgroundMemo = withMemo(DialogBackground, styles);
export { DialogBackgroundMemo as DialogBackground };
