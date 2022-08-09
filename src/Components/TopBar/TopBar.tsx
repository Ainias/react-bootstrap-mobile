import * as React from 'react';
import { ComponentType, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { Container } from '../Layout/Container';
import { TopBarButton } from './TopBarButton';
import { RbmComponentProps } from '../RbmComponentProps';
import { ActionSheet, ActionSheetAction } from '../ActionSheet/ActionSheet';
import { Icon, IconSource } from '../Icon/Icon';
import { MoreButton } from './MoreButton';

import styles from './topBar.scss';

import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';
import { Block } from '../Layout/Block';
import { Words } from '../Text/Words';
import { Flex } from '../Layout/Flex';
import { Inline } from '../Layout/Inline';
import { View } from '../Layout/View';

export type TopBarActionButtonType = {
    title: string;
    icon?: IconSource;
    action: () => void;
    disabled?: boolean;
    key?: string;
};

export type TopBarComponentButtonType = Partial<TopBarActionButtonType> & {
    component: ComponentType<Record<string, any>>;
};

export type TopBarButtonType = TopBarComponentButtonType | TopBarActionButtonType;

export type TopBarProps = RbmComponentProps<{
    title?: string;
    leftButtons?: TopBarButtonType[];
    rightButtons?: TopBarButtonType[];
    hiddenButtons?: TopBarButtonType[];
    transparent?: boolean;
    drawBehind?: boolean;
}>;

function getButtonComponents(buttons: TopBarButtonType[]) {
    return buttons.map((button, index) => {
        const key = button.key ?? String(index);
        if ('component' in button) {
            const Component = button.component;
            return <Component {...button} key={key} onClick={button.action} />;
        }
        let child: string | ReactElement | undefined = button.title;
        if (button.icon) {
            child = <Icon icon={button.icon} />;
        }
        return (
            <TopBarButton key={key} onClick={button.action} disabled={button.disabled} __allowChildren="all">
                {child}
            </TopBarButton>
        );
    });
}

function TopBar({
    title = '',
    rightButtons = [],
    leftButtons = [],
    hiddenButtons = [],
    className,
    transparent = false,
    drawBehind = false,
    ...rbmProps
}: TopBarProps) {
    const [isHiddenMenuOpen, setIsHiddenMenuOpen] = useState(false);

    if (isHiddenMenuOpen) {
        transparent = false;
    }

    const actionSheetRef = useRef<React.ElementRef<typeof ActionSheet>>(null);

    const toggleHiddenMenu = useCallback(() => {
        setIsHiddenMenuOpen((isOpen) => {
            if (isOpen) {
                actionSheetRef.current?.hide();
                return false;
            }
            actionSheetRef.current?.show();
            return true;
        });
    }, [actionSheetRef]);

    const onActionSheetClose = useCallback(() => setIsHiddenMenuOpen(false), [setIsHiddenMenuOpen]);

    rightButtons = useMemo(() => {
        if (hiddenButtons.length > 0) {
            return [
                ...rightButtons,
                {
                    title: '...',
                    component: MoreButton,
                    action: toggleHiddenMenu,
                },
            ];
        }
        return rightButtons;
    }, [rightButtons, hiddenButtons.length, toggleHiddenMenu]);

    hiddenButtons = useMemo(
        () =>
            hiddenButtons.map((button) => ({
                ...button,
                action: () => {
                    setIsHiddenMenuOpen(false);
                    actionSheetRef.current?.hide();
                    if (button.action) {
                        button.action();
                    }
                },
            })),
        [hiddenButtons]
    );

    const rightButtonComponents = getButtonComponents(rightButtons);
    const leftButtonComponents = getButtonComponents(leftButtons);
    const hiddenButtonComponents = getButtonComponents(hiddenButtons.map(({ icon: _, ...button }) => button));

    const actions: ActionSheetAction<any>[] = useMemo(
        () =>
            hiddenButtons.map((button) => ({
                action: button.action!,
                name: button.title!,
                icon: button.icon,
            })),
        [hiddenButtons]
    );

    return (
        <nav
            {...rbmProps}
            className={classNames(
                styles.topBar,
                {
                    [styles.transparent]: transparent,
                    [styles.drawBehind]: drawBehind,
                },
                className
            )}
        >
            <Container fluid="xxl" className={styles.container}>
                <Flex grow={true} className={classNames(styles.buttonContainer, styles.left)} horizontal={true}>
                    {leftButtonComponents}
                </Flex>
                <Block className={styles.titleContainer}>
                    <Words className={styles.title}>{title}</Words>
                </Block>
                <Flex grow={true} className={classNames(styles.buttonContainer, styles.right)} horizontal={true}>
                    {rightButtonComponents}
                </Flex>
                {hiddenButtons.length > 0 && isHiddenMenuOpen ? (
                    <Inline className={styles.hiddenContainer}>
                        <View aria-hidden={true} className={styles.hiddenCloseCurtain} onClick={toggleHiddenMenu} />
                        <View className={styles.hiddenMenu}>{hiddenButtonComponents}</View>
                    </Inline>
                ) : null}
                <ActionSheet
                    actions={actions}
                    ref={actionSheetRef}
                    className={styles.hiddenActionMenu}
                    onClose={onActionSheetClose}
                />
            </Container>
        </nav>
    );
}

const TopBarMemo = withMemo(TopBar, styles);
export { TopBarMemo as TopBar };
