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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { TopBarButton } from './TopBarButton';
import { prefixClass } from '../helper';
import { ActionSheet } from '../ActionSheet/ActionSheet';
import { Icon } from '../Icon/Icon';
import { MoreButton } from './MoreButton';
export var TopBar = React.memo(function (_a) {
    var _b = _a.title, title = _b === void 0 ? '' : _b, _c = _a.rightButtons, rightButtons = _c === void 0 ? [] : _c, _d = _a.leftButtons, leftButtons = _d === void 0 ? [] : _d, _e = _a.hiddenButtons, hiddenButtons = _e === void 0 ? [] : _e, className = _a.className, _f = _a.transparent, transparent = _f === void 0 ? false : _f, _g = _a.drawBehind, drawBehind = _g === void 0 ? false : _g, rbmProps = __rest(_a, ["title", "rightButtons", "leftButtons", "hiddenButtons", "className", "transparent", "drawBehind"]);
    var _h = useState(false), isHiddenMenuOpen = _h[0], setIsHiddenMenuOpen = _h[1];
    var actionSheetRef = useRef(null);
    var toggleHiddenMenu = useCallback(function () {
        setIsHiddenMenuOpen(function (isHidden) {
            var _a, _b;
            if (isHidden) {
                console.log('show');
                (_a = actionSheetRef.current) === null || _a === void 0 ? void 0 : _a.show();
                return false;
            }
            console.log('hide');
            (_b = actionSheetRef.current) === null || _b === void 0 ? void 0 : _b.hide();
            return true;
        });
    }, [actionSheetRef]);
    var onActionSheetClose = useCallback(function () { return setIsHiddenMenuOpen(true); }, [setIsHiddenMenuOpen]);
    rightButtons = useMemo(function () {
        if (hiddenButtons.length > 0) {
            return __spreadArray(__spreadArray([], rightButtons, true), [
                {
                    title: '...',
                    component: MoreButton,
                    action: toggleHiddenMenu,
                },
            ], false);
        }
        return rightButtons;
    }, [rightButtons, hiddenButtons.length, toggleHiddenMenu]);
    hiddenButtons = useMemo(function () {
        return hiddenButtons.map(function (button) { return (__assign(__assign({}, button), { action: function () {
                setIsHiddenMenuOpen(false);
                if (button.action) {
                    button.action();
                }
            } })); });
    }, [hiddenButtons]);
    var rightButtonComponents = getButtonComponents(rightButtons);
    var leftButtonComponents = getButtonComponents(leftButtons);
    var hiddenButtonComponents = getButtonComponents(hiddenButtons.map(function (_a) {
        var icon = _a.icon, button = __rest(_a, ["icon"]);
        return button;
    }));
    var actions = hiddenButtons.map(function (button) { return ({
        action: button.action,
        name: button.title,
        icon: button.icon,
    }); });
    var classes = ['topbar'];
    if (transparent)
        classes.push('transparent');
    if (drawBehind)
        classes.push('draw-behind');
    return (React.createElement(Navbar, __assign({}, rbmProps, { variant: "light", className: prefixClass(classes, className) }),
        React.createElement(Container, { fluid: "xxl" },
            React.createElement("div", { className: prefixClass('topbar-button-container left') }, leftButtonComponents),
            React.createElement("div", { className: prefixClass('topbar-title-container') },
                React.createElement(Navbar.Text, { className: prefixClass('topbar-title') }, title)),
            React.createElement("div", { className: prefixClass('topbar-button-container right') }, rightButtonComponents),
            hiddenButtons.length > 0 && isHiddenMenuOpen ? (React.createElement("span", { className: prefixClass('topbar-hidden-container') },
                React.createElement("span", { "aria-hidden": true, className: prefixClass('topbar-hidden-close-curtain'), onClick: toggleHiddenMenu }),
                React.createElement("span", { className: prefixClass('topbar-hidden-menu') }, hiddenButtonComponents))) : null,
            React.createElement(ActionSheet, { actions: actions, ref: actionSheetRef, className: prefixClass('topbar-hidden-action-menu'), onClose: onActionSheetClose }))));
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
            child = React.createElement(Icon, { icon: button.icon });
        }
        return (React.createElement(TopBarButton, { key: key, onClick: button.action, disabled: button.disabled }, child));
    });
}
//# sourceMappingURL=TopBar.js.map