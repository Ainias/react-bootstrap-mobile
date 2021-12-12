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
function Checkbox(_a) {
    // Variables
    var _b;
    var children = _a.children, _c = _a.label, label = _c === void 0 ? '' : _c, _d = _a.isLabelBeforeCheckbox, isLabelBeforeCheckbox = _d === void 0 ? false : _d, id = _a.id, className = _a.className, props = __rest(_a, ["children", "label", "isLabelBeforeCheckbox", "id", "className"]);
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    // Render Functions
    if (React.Children.count(children) === 1 && typeof children === 'string') {
        label = children;
    }
    var preLabel = '';
    if (isLabelBeforeCheckbox) {
        _b = [preLabel, label], label = _b[0], preLabel = _b[1];
    }
    return (React.createElement("span", { className: prefixClass(['checkbox'], className) },
        React.createElement("label", { htmlFor: id, key: id },
            React.createElement("span", { className: prefixClass('checkbox-label') }, preLabel),
            React.createElement("input", __assign({}, props, { type: "checkbox", id: id, className: prefixClass('checkbox-input') })),
            React.createElement("span", { className: prefixClass('checkbox-checkmark') }),
            React.createElement("span", { className: prefixClass('checkbox-label') }, label))));
}
var tmp = React.memo(Checkbox);
export { tmp as Checkbox };
//# sourceMappingURL=Checkbox.js.map