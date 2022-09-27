import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';

import styles from './card.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';
import { ReactElement } from 'react';

export type CardProps = RbmComponentProps<{
    title?: string | ReactElement;
    fullHeight?: boolean;
    noPaddingHeight?: boolean;
    noPaddingWidth?: boolean;
    noPadding?: boolean;
    noMargin?: boolean;
}>;

function Card({
    title,
    children,
    fullHeight = false,
    noPaddingHeight = false,
    noPadding = false,
    noPaddingWidth = false,
    noMargin = false,
    className,
    ...rbmProps
}: CardProps) {
    const classes = classNames(styles.card, className, {
        [styles.fullHeight]: fullHeight,
        [styles.noPadding]: noPadding,
        [styles.noMargin]: noMargin,
        [styles.noPaddingHeight]: noPaddingHeight,
        [styles.noPaddingWidth]: noPaddingWidth,
    });

    return (
        <div {...rbmProps} className={classes}>
            {title ? <div className={styles.title}>{title}</div> : null}
            <div className={styles.content}>{children}</div>
        </div>
    );
}

const CardMemo = withMemo(Card, styles);
export { CardMemo as Card };
