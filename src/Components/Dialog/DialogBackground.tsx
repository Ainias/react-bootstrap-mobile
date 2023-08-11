import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps } from '../RbmComponentProps';
import { Block } from '../Layout/Block';
import { EmptyProps } from '../../helper/EmptyProps';

import styles from './dialogBackground.scss';
import classNames from 'classnames';
import {Heading} from "../Text/Heading";

export type DialogBackgroundProps = RbmComponentProps<{title?: string}>;

export const DialogBackground = withMemo(function DialogBackground({ children, className, style, title }: DialogBackgroundProps) {
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
            {!!title && <Heading className={styles.title}>{title}</Heading>}
            {children}
        </Block>
    );
}, styles);
