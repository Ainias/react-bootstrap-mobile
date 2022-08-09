import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Ref, useCallback, useImperativeHandle, useState } from 'react';
import { Clickable } from '../Clickable/Clickable';
import { Container } from '../Layout/Container';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon, IconSource } from '../Icon/Icon';

import styles from './actionSheet.scss';
import { withForwardRef } from '../../helper/withForwardRef';
import classNames from 'classnames';
import { InlineBlock } from '../Layout/InlineBlock';
import { Words } from '../Text/Words';
import { Flex } from '../Layout/Flex';
import { Block } from '../Layout/Block';

export type ActionSheetAction<ActionData> = {
    name: string;
    icon?: IconSource;
    action: (data?: ActionData) => void;
    actionData?: ActionData;
    isDeleteAction?: boolean;
};

export type ActionSheetProps = RbmComponentProps<{
    title?: string;
    actions: ActionSheetAction<any>[];
    cancelText?: string;
    onClose?: () => void;
}>;

export type ActionSheetHandle = {
    show: () => void;
    hide: () => void;
};

function ActionSheet(
    { title, actions, cancelText = 'Cancel', className, onClose }: ActionSheetProps,
    ref: Ref<ActionSheetHandle>
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
        (_, action?: ActionSheetAction<any>) => {
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
            <Words>{action.name}</Words>
        </Clickable>
    );

    return (
        <Clickable
            className={classNames(styles.actionSheet, { [styles.open]: actions.length > 0 && isOpen }, className)}
            onClick={close}
        >
            <Container fluid="xxl" className="full-height">
                <Flex className={styles.content}>
                    {title ? (
                        <Block>
                            <Words>{title}</Words>
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
}

const ActionSheetMemo = withForwardRef<ActionSheetProps, ActionSheetHandle>(ActionSheet, styles);
export { ActionSheetMemo as ActionSheet };
