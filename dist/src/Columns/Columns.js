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
import { Col, Row } from 'react-bootstrap';
function Columns(_a) {
    // Variables
    var className = _a.className, children = _a.children, rowProps = __rest(_a, ["className", "children"]);
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    // Render Functions
    return (React.createElement(Row, __assign({}, rowProps), React.Children.map(children, function (child) { return (React.createElement(Col, null, child)); })));
}
var tmp = React.memo(Columns);
export { tmp as Columns };
//# sourceMappingURL=Columns.js.map