import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { ForwardedRef, useCallback, useImperativeHandle, useState } from 'react';
import { Clickable } from '../Clickable/Clickable';
import { Container } from '../Layout/Container';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon, IconSource } from '../Icon/Icon';
import styles from './actionSheet.scss';
import classNames from 'classnames';
import { InlineBlock } from '../Layout/InlineBlock';
import { Text } from '../Text/Text';
import { Flex } from '../Layout/Flex';
import { Block } from '../Layout/Block';
import { withMemo } from "../../helper/withMemo";

export type ActionSheetAction<ActionData> = {
    name: string;
    icon?: IconSource;
    action: (data?: ActionData) => void;
    actionData?: ActionData;
    isDeleteAction?: boolean;
};

export type ActionSheetHandle = {
    show: () => void;
    hide: () => void;
};


export type ActionSheetProps = RbmComponentProps<{
    title?: string;
    actions: ActionSheetAction<any>[];
    cancelText?: string;
    onClose?: () => void;
    ref?: ForwardedRef<ActionSheetHandle>
}>;

export const ActionSheet = withMemo(function ActionSheet(
    { title, actions, cancelText = 'Cancel', className, onClose, style, ref }: ActionSheetProps,
) {
    const [isOpen, setIsOpen] = useState(false);

    // Variables

    // States

    // Refs

    // Callbacks
    const close = useCallback(() => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    }, [setIsOpen, onClose]);
    const onActionClick = useCallback(
        (_: any, action?: ActionSheetAction<any>) => {
            close();
            action?.action(action.actionData);
        },
        [close]
    );

    useImperativeHandle(
        ref,
        () => ({
            show: () => setIsOpen(true),
            hide: close,
        }),
        [setIsOpen, close]
    );

    // Effects

    // Other

    const renderAction = (action: ActionSheetAction<any>) => (
        <Clickable key={action.name} className={styles.action} onClick={onActionClick} onClickData={action}>
            <InlineBlock className={styles.actionIcon}>{action.icon ? <Icon icon={action.icon} /> : null}</InlineBlock>
            <Text>{action.name}</Text>
        </Clickable>
    );

    return (
        <Clickable
            className={classNames(styles.actionSheet, { [styles.open]: actions.length > 0 && isOpen }, className)}
            onClick={close}
            style={style}
        >
            <Container fluid="xxl" className="full-height">
                <Flex className={styles.content}>
                    {title ? (
                        <Block>
                            <Text>{title}</Text>
                        </Block>
                    ) : null}
                    {actions.map(renderAction)}
                    <Clickable
                        className={styles.cancel}
                        onClick={() => console.log('Cancel clicked')}
                        __allowChildren="all"
                    >
                        <InlineBlock className={styles.actionIcon}>
                            <Icon icon={faTimes} />
                        </InlineBlock>
                        {cancelText}
                    </Clickable>
                </Flex>
            </Container>
        </Clickable>
    );
}, styles);
