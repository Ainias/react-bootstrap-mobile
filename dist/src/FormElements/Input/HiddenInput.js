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
import { Input } from './Input';
import { prefixClass } from '../../helper';
function HiddenInput(_a) {
    // Variables
    var _b = _a.noFocusHint, noFocusHint = _b === void 0 ? false : _b, className = _a.className, props = __rest(_a, ["noFocusHint", "className"]);
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    // Render Functions
    var noFocusHintClass = noFocusHint ? 'no-focus-hint' : undefined;
    return React.createElement(Input, __assign({ className: prefixClass(['hidden-input', noFocusHintClass], className) }, props));
}
var tmp = React.memo(HiddenInput);
export { tmp as HiddenInput };
//# sourceMappingURL=HiddenInput.js.map