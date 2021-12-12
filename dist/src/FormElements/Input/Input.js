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
import { useCallback } from 'react';
import { prefixClass } from '../../helper';
function Input(_a) {
    // Variables
    var label = _a.label, className = _a.className, onChangeData = _a.onChangeData, outsideOnChange = _a.onChange, rbmProps = __rest(_a, ["label", "className", "onChangeData", "onChange"]);
    // States
    // Refs
    // Callbacks
    var onChange = useCallback(function (e) {
        if (outsideOnChange) {
            outsideOnChange(Object.assign(e, { extraData: onChangeData }));
        }
    }, [outsideOnChange, onChangeData]);
    // Effects
    // Other
    // Render Functions
    return (React.createElement("label", { className: prefixClass('input', className) },
        label ? React.createElement("span", { className: prefixClass('input-label') }, label) : null,
        React.createElement("input", __assign({}, rbmProps, { className: prefixClass('input-text'), onChange: onChange }))));
}
var tmp = React.memo(Input);
export { tmp as Input };
//# sourceMappingURL=Input.js.map