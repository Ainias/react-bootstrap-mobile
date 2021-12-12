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
import { prefixClass } from '../../helper';
export var Switch = React.memo(function (_a) {
    // Variables
    var _b;
    var children = _a.children, _c = _a.label, label = _c === void 0 ? '' : _c, _d = _a.preLabel, preLabel = _d === void 0 ? '' : _d, _e = _a.isLabelBeforeSwitch, isLabelBeforeSwitch = _e === void 0 ? false : _e, _f = _a.isDual, isDual = _f === void 0 ? undefined : _f, id = _a.id, className = _a.className, props = __rest(_a, ["children", "label", "preLabel", "isLabelBeforeSwitch", "isDual", "id", "className"]);
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    // Render Functions
    if (React.Children.count(children) === 1 && typeof children === 'string') {
        label = children;
    }
    if (isLabelBeforeSwitch) {
        _b = [preLabel, label], label = _b[0], preLabel = _b[1];
    }
    if (label && preLabel && isDual === undefined) {
        isDual = true;
    }
    return (React.createElement("span", { className: prefixClass(['switch', isDual ? 'dual' : undefined], className) },
        React.createElement("label", { htmlFor: id, key: id },
            React.createElement("span", { className: prefixClass('switch-label') }, preLabel),
            React.createElement("input", __assign({}, props, { type: "checkbox", id: id })),
            React.createElement("div", { className: prefixClass('switch-toggle') },
                React.createElement("span", { className: prefixClass('switch-handle') })),
            React.createElement("span", { className: prefixClass('switch-label') }, label))));
});
//# sourceMappingURL=Switch.js.map