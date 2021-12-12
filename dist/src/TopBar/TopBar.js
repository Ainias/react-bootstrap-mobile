var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { TopBarButton } from './TopBarButton';
import { prefixClass } from '../helper';
export var TopBar = React.memo(function (_a) {
    var _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.rightButtons, rightButtons = _c === void 0 ? [] : _c, _d = _a.leftButtons, leftButtons = _d === void 0 ? [] : _d, className = _a.className, rbmProps = __rest(_a, ["title", "rightButtons", "leftButtons", "className"]);
    var rightButtonComponents = getButtonComponents(rightButtons);
    var leftButtonComponents = getButtonComponents(leftButtons);
    return (React.createElement(Navbar, __assign({}, rbmProps, { variant: "light", className: prefixClass('topbar', className) }),
        React.createElement(Container, { fluid: "xxl" },
            React.createElement("div", { className: prefixClass('topbar-button-container left') }, leftButtonComponents),
            React.createElement("div", { className: prefixClass('topbar-title-container') },
                React.createElement(Navbar.Text, { className: prefixClass('topbar-title') }, title)),
            React.createElement("div", { className: prefixClass('topbar-button-container right') }, rightButtonComponents))));
});
function getButtonComponents(buttons) {
    return buttons.map(function (button, index) {
        var _a;
        var key = (_a = button.key) !== null && _a !== void 0 ? _a : String(index);
        if ('component' in button) {
            var Component = button.component;
            return (React.createElement(Component, { key: key, title: button.title, onClick: button.action, disabled: button.disabled, icon: button.icon }));
        }
        var child = button.title;
        if (button.icon) {
            child = React.createElement("img", { src: button.icon, alt: button.title, title: button.title });
        }
        return (React.createElement(TopBarButton, { key: key, onClick: button.action, disabled: button.disabled }, child));
    });
}
//# sourceMappingURL=TopBar.js.map