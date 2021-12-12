import * as React from 'react';
import { ComponentType, FunctionComponent, ReactElement } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { TopBarButton } from './TopBarButton';
import { prefixClass } from '../helper';
import { RbmComponentProps } from '../RbmComponentProps';

export type TopBarComponentButtonType = {
    title?: string;
    icon?: string;
    component: ComponentType<Record<string, any>>;
    action?: () => void;
    disabled?: boolean;
    key?: string;
};

export type TopBarActionButtonType = {
    title: string;
    icon?: string;
    action: () => void;
    disabled?: boolean;
    key?: string;
};

export type TopBarButtonType = TopBarComponentButtonType | TopBarActionButtonType;

export type TopBarProps = RbmComponentProps<{
    title?: string;
    rightButtons?: TopBarButtonType[];
    leftButtons?: TopBarButtonType[];
}>;

export const TopBar: FunctionComponent<TopBarProps> = React.memo(
    ({ title = '', rightButtons = [], leftButtons = [], className, ...rbmProps }) => {
        const rightButtonComponents = getButtonComponents(rightButtons);
        const leftButtonComponents = getButtonComponents(leftButtons);

        return (
            <Navbar {...rbmProps} variant="light" className={prefixClass('topbar', className)}>
                <Container fluid="xxl">
                    <div className={prefixClass('topbar-button-container left')}>{leftButtonComponents}</div>
                    <div className={prefixClass('topbar-title-container')}>
                        <Navbar.Text className={prefixClass('topbar-title')}>{title}</Navbar.Text>
                    </div>
                    <div className={prefixClass('topbar-button-container right')}>{rightButtonComponents}</div>
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
            return (
                <Component
                    key={key}
                    title={button.title}
                    onClick={button.action}
                    disabled={button.disabled}
                    icon={button.icon}
                />
            );
        }
        let child: string | ReactElement | undefined = button.title;
        if (button.icon) {
            child = <img src={button.icon} alt={button.title} title={button.title} />;
        }
        return (
            <TopBarButton key={key} onClick={button.action} disabled={button.disabled}>
                {child}
            </TopBarButton>
        );
    });
}
