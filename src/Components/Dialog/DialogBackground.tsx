import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps } from '../RbmComponentProps';
import { Block } from '../Layout/Block';
import styles from './dialogBackground.scss';
import classNames from 'classnames';
import { Heading } from "../Text/Heading";
import { Flex } from "../Layout/Flex";
import { Grow } from "../Layout/Grow";
import { Clickable } from "../Clickable/Clickable";
import { Icon } from "../Icon/Icon";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export type DialogBackgroundProps = RbmComponentProps<{ title?: string, onClose?: () => void }>;

export const DialogBackground = withMemo(function DialogBackground({
                                                                       children,
                                                                       className,
                                                                       style,
                                                                       title,
                                                                       onClose
                                                                   }: DialogBackgroundProps) {
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
            {(!!title || !!onClose) && <Flex horizontal={true} className={styles.title}>{!!title &&
            <Grow><Heading >{title}</Heading></Grow>}{!!onClose &&
            <Clickable onClick={onClose}><Icon size="lg" icon={faCircleXmark}/></Clickable>}</Flex>}
            {children}
        </Block>
    );
}, styles);
