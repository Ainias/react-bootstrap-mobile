import * as React from 'react';
import { ComponentType, FunctionComponent, ReactElement, useCallback, useMemo, useRef, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { TopBarButton } from './TopBarButton';
import { prefixClass } from '../../helper';
import { RbmComponentProps } from '../RbmComponentProps';
import { ActionSheet, ActionSheetAction } from '../ActionSheet/ActionSheet';
import { Icon, IconSource } from '../Icon/Icon';
import { MoreButton } from './MoreButton';

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

export const TopBar: FunctionComponent<TopBarProps> = React.memo(
    ({
        title = '',
        rightButtons = [],
        leftButtons = [],
        hiddenButtons = [],
        className,
        transparent = false,
        drawBehind = false,
        ...rbmProps
    }) => {
        const [isHiddenMenuOpen, setIsHiddenMenuOpen] = useState(false);

        if (isHiddenMenuOpen) {
            transparent = false;
        }

        const actionSheetRef = useRef<React.ElementRef<typeof ActionSheet>>(null);

        const toggleHiddenMenu = useCallback(() => {
            setIsHiddenMenuOpen((isOpen) => {
                if (isOpen) {
                    console.log('show');
                    actionSheetRef.current?.hide();
                    return false;
                }
                console.log('hide');
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
        const hiddenButtonComponents = getButtonComponents(hiddenButtons.map(({ icon, ...button }) => button));

        const actions: ActionSheetAction<any>[] = hiddenButtons.map((button) => ({
            action: button.action!,
            name: button.title!,
            icon: button.icon,
        }));

        const classes = ['topbar'];
        if (transparent) classes.push('transparent');
        if (drawBehind) classes.push('draw-behind');

        return (
            <Navbar {...rbmProps} variant="light" className={prefixClass(classes, className)}>
                <Container fluid="xxl">
                    <div className={prefixClass('topbar-button-container left')}>{leftButtonComponents}</div>
                    <div className={prefixClass('topbar-title-container')}>
                        <Navbar.Text className={prefixClass('topbar-title')}>{title}</Navbar.Text>
                    </div>
                    <div className={prefixClass('topbar-button-container right')}>{rightButtonComponents}</div>
                    {hiddenButtons.length > 0 && isHiddenMenuOpen ? (
                        <span className={prefixClass('topbar-hidden-container')}>
                            <span
                                aria-hidden={true}
                                className={prefixClass('topbar-hidden-close-curtain')}
                                onClick={toggleHiddenMenu}
                            />
                            <span className={prefixClass('topbar-hidden-menu')}>{hiddenButtonComponents}</span>
                        </span>
                    ) : null}
                    <ActionSheet
                        actions={actions}
                        ref={actionSheetRef}
                        className={prefixClass('topbar-hidden-action-menu')}
                        onClose={onActionSheetClose}
                    />
                </Container>
            </Navbar>
        );
    }
);

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
