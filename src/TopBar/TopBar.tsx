import * as React from 'react';
import { ComponentType, FunctionComponent, ReactElement } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { TopBarButton } from './TopBarButton';

type ButtonType = {
    title?: string;
    icon?: string;
    component?: ComponentType<Record<string, any>>;
    action?: () => void;
    disabled?: boolean;
};

type Props = {
    title?: string;
    rightButtons?: ButtonType[];
    leftButtons?: ButtonType[];
};

export const TopBar: FunctionComponent<Props> = React.memo(
    ({ title = '', rightButtons = [], leftButtons = [] }) => {
        const rightButtonComponents = getButtonComponents(rightButtons);
        const leftButtonComponents = getButtonComponents(leftButtons);

        return (
            <Navbar variant="light" className="topbar">
                <Container>
                    <div className="button-container left">{leftButtonComponents}</div>
                    <div className="title-container">
                        <Navbar.Text className="title">{title}</Navbar.Text>
                    </div>
                    <div className="button-container right">{rightButtonComponents}</div>
                </Container>
            </Navbar>
        );
    }
);

function getButtonComponents(buttons: ButtonType[]) {
    return buttons.map((button) => {
        if (button.component) {
            const Component = button.component;
            return (
                <Component title={button.title} onClick={button.action} disabled={button.disabled} icon={button.icon} />
            );
        }
        let child: string | ReactElement | undefined = button.title;
        if (button.icon) {
            child = <img src={button.icon} alt={button.title} title={button.title} />;
        }
        return (
            <TopBarButton onClick={button.action} disabled={button.disabled}>
                {child}
            </TopBarButton>
        );
    });
}
