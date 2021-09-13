import * as React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { TopBarButton } from './TopBarButton';
export var TopBar = React.memo(function (_a) {
    var _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.rightButtons, rightButtons = _c === void 0 ? [] : _c, _d = _a.leftButtons, leftButtons = _d === void 0 ? [] : _d;
    var rightButtonComponents = getButtonComponents(rightButtons);
    var leftButtonComponents = getButtonComponents(leftButtons);
    return (React.createElement(Navbar, { variant: "light", className: "topbar" },
        React.createElement(Container, null,
            React.createElement("div", { className: "button-container left" }, leftButtonComponents),
            React.createElement("div", { className: "title-container" },
                React.createElement(Navbar.Text, { className: "title" }, title)),
            React.createElement("div", { className: "button-container right" }, rightButtonComponents))));
});
function getButtonComponents(buttons) {
    return buttons.map(function (button) {
        if (button.component) {
            var Component = button.component;
            return (React.createElement(Component, { title: button.title, onClick: button.action, disabled: button.disabled, icon: button.icon }));
        }
        var child = button.title;
        if (button.icon) {
            child = React.createElement("img", { src: button.icon, alt: button.title, title: button.title });
        }
        return (React.createElement(TopBarButton, { onClick: button.action, disabled: button.disabled }, child));
    });
}
//# sourceMappingURL=TopBar.js.map