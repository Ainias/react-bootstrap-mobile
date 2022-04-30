import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Icon, IconSource } from '../Icon/Icon';
import { ComponentType, useCallback, useState } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { prefixClass } from '../../helper';
import { TabBarButton } from './TabBarButton';

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

let TabBar = function TabBar({
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

    const classes = ['tabBar'];
    if (transparent) classes.push('transparent');
    if (underline) classes.push('underlined');

    return (
        <Nav {...rbmProps} className={prefixClass(classes, className)} onSelect={onSelect}>
            <Container fluid="xxl" className={prefixClass('tabBar-button-container')}>
                {buttonComponents}
            </Container>
        </Nav>
    );
};
TabBar = React.memo(TabBar) as typeof TabBar;
export { TabBar };

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
                    {button.icon ? <Icon icon={button.icon} className={prefixClass('tabBar-button-icon')} /> : null}
                    {button.title ? <span className={prefixClass('tabBar-button-title')}>{button.title}</span> : null}
                </span>
            </TabBarButton>
        );
    });
}
