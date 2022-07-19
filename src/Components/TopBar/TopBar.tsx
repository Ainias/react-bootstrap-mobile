import * as React from 'react';
import { ComponentType, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { TopBarButton } from './TopBarButton';
import { RbmComponentProps } from '../RbmComponentProps';
import { ActionSheet, ActionSheetAction } from '../ActionSheet/ActionSheet';
import { Icon, IconSource } from '../Icon/Icon';
import { MoreButton } from './MoreButton';

import styles from './topBar.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

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
            <TopBarButton key={key} onClick={button.action} disabled={button.disabled}>
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

    const actions: ActionSheetAction<any>[] = hiddenButtons.map((button) => ({
        action: button.action!,
        name: button.title!,
        icon: button.icon,
    }));

    return (
        <Navbar
            {...rbmProps}
            variant="light"
            className={classNames(
                styles.topBar,
                {
                    [styles.transparent]: transparent,
                    [styles.drawBehind]: drawBehind,
                },
                className
            )}
        >
            <Container fluid="xxl">
                <div className={classNames(styles.buttonContainer, 'left')}>{leftButtonComponents}</div>
                <div className={styles.titleContainer}>
                    <Navbar.Text className={styles.title}>{title}</Navbar.Text>
                </div>
                <div className={classNames(styles.buttonContainer, 'right')}>{rightButtonComponents}</div>
                {hiddenButtons.length > 0 && isHiddenMenuOpen ? (
                    <span className={styles.hiddenContainer}>
                        <span aria-hidden={true} className={styles.hiddenCloseCurtain} onClick={toggleHiddenMenu} />
                        <span className={styles.hiddenMenu}>{hiddenButtonComponents}</span>
                    </span>
                ) : null}
                <ActionSheet
                    actions={actions}
                    ref={actionSheetRef}
                    className={styles.hiddenActionMenu}
                    onClose={onActionSheetClose}
                />
            </Container>
        </Navbar>
    );
}

const TopBarMemo = withMemo(TopBar, styles);
export { TopBarMemo as TopBar };
