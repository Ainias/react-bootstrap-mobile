import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Icon, IconSource } from '../Icon/Icon';
import { ComponentType, useCallback, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { TabBarButton } from './TabBarButton';

import styles from './tabBar.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

export type TabBarComponentButtonType = {
    component: ComponentType<Record<string, any>>;
    key?: string;
};

export type TabBarTitleButtonType = {
    title: string;
    icon?: IconSource;
    key?: string;
};

export type TabBarIconButtonType = {
    title?: string;
    icon: IconSource;
    key?: string;
};

export type TabBarButtonType = TabBarComponentButtonType | TabBarTitleButtonType | TabBarIconButtonType;

export type TabBarProps = RbmComponentProps<{
    buttons: TabBarButtonType[];
    startActiveTab?: number;
    onTabChange: (newActiveTab: number) => void;
    activeTab?: number;
    transparent?: boolean;
    drawBehind?: boolean;
    underline?: boolean;
}>;

function getButtonComponents(buttons: TabBarButtonType[], activeTab: number) {
    return buttons.map((button, index) => {
        const isActive = index === activeTab;

        const key = button.key ?? String(index);
        if ('component' in button) {
            const Component = button.component;
            return <Component key={key} active={isActive} />;
        }

        return (
            <TabBarButton key={key} active={isActive} index={index}>
                <span>
                    {button.icon ? <Icon icon={button.icon} className={styles.buttonIcon} /> : null}
                    {button.title ? <span className={styles.buttonTitle}>{button.title}</span> : null}
                </span>
            </TabBarButton>
        );
    });
}

function TabBar({
    buttons,
    startActiveTab,
    onTabChange,
    activeTab,
    transparent,
    underline,
    className,
    ...rbmProps
}: TabBarProps) {
    // States
    const [internalActiveTab, setInternalActiveTab] = useState(startActiveTab ?? 0);
    activeTab = activeTab ?? internalActiveTab;

    // Refs

    // Callbacks
    const onSelect = useCallback(
        (index: string | null) => {
            setInternalActiveTab(Number(index));
            onTabChange(Number(index));
        },
        [onTabChange, setInternalActiveTab]
    );

    // Effects

    // Other

    // Render Functions
    const buttonComponents = getButtonComponents(buttons, activeTab);

    return (
        <Nav
            {...rbmProps}
            className={classNames(
                styles.tabBar,
                {
                    [styles.transparent]: transparent,
                    [styles.underlined]: underline,
                },
                className
            )}
            onSelect={onSelect}
        >
            <Container fluid="xxl" className={styles.buttonContainer}>
                {buttonComponents}
            </Container>
        </Nav>
    );
}

const TabBarMemo = withMemo(TabBar, styles);
export { TabBarMemo as TabBar };
