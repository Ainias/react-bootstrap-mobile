import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Icon, IconSource } from '../Icon/Icon';
import { ComponentType, useCallback, useState } from 'react';
import { Container } from '../Layout/Container';
import { TabBarButton } from './TabBarButton';

import styles from './tabBar.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';
import { ListenerWithData } from '../Hooks/useListener';

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

function getButtonComponents(buttons: TabBarButtonType[], activeTab: number, onSelect: ListenerWithData<number>) {
    return buttons.map((button, index) => {
        const isActive = index === activeTab;

        const key = button.key ?? String(index);
        if ('component' in button) {
            const Component = button.component;
            return <Component key={key} active={isActive} />;
        }

        return (
            <TabBarButton key={key} active={isActive} onClickData={index} onClick={onSelect}>
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
        (_: any, index: number) => {
            setInternalActiveTab(index);
            onTabChange(index);
        },
        [onTabChange, setInternalActiveTab]
    );

    // Effects

    // Other

    // Render Functions
    const buttonComponents = getButtonComponents(buttons, activeTab, onSelect);

    return (
        <div
            {...rbmProps}
            className={classNames(
                styles.tabBar,
                {
                    [styles.transparent]: transparent,
                    [styles.underlined]: underline,
                },
                className
            )}
        >
            <Container fluid="xxl" className={styles.buttonContainer}>
                {buttonComponents}
            </Container>
        </div>
    );
}

const TabBarMemo = withMemo(TabBar, styles);
export { TabBarMemo as TabBar };
