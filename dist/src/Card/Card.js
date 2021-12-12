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
import { prefixClass } from '../helper';
export var Card = React.memo(function (_a) {
    var title = _a.title, children = _a.children, _b = _a.fullHeight, fullHeight = _b === void 0 ? false : _b, _c = _a.noPaddingHeight, noPaddingHeight = _c === void 0 ? false : _c, _d = _a.noPadding, noPadding = _d === void 0 ? false : _d, _e = _a.noPaddingWidth, noPaddingWidth = _e === void 0 ? false : _e, _f = _a.noMargin, noMargin = _f === void 0 ? false : _f, className = _a.className, rbmProps = __rest(_a, ["title", "children", "fullHeight", "noPaddingHeight", "noPadding", "noPaddingWidth", "noMargin", "className"]);
    var classes = ['card'];
    if (fullHeight)
        classes.push('full-height');
    if (noPadding)
        classes.push('no-padding');
    if (noMargin)
        classes.push('no-margin');
    if (noPaddingHeight)
        classes.push('no-padding-height');
    if (noPaddingWidth)
        classes.push('no-padding-width');
    return (React.createElement("div", __assign({}, rbmProps, { className: prefixClass(classes, className) }),
        title ? React.createElement("div", { className: "title" }, title) : null,
        React.createElement("div", { className: "content" }, children)));
});
//# sourceMappingURL=Card.js.map