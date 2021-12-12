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
function List(_a) {
    // Variables
    var items = _a.items, renderItem = _a.renderItem, renderBefore = _a.renderBefore, keyExtractor = _a.keyExtractor, className = _a.className, props = __rest(_a, ["items", "renderItem", "renderBefore", "keyExtractor", "className"]);
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    // Render Functions
    return (React.createElement("ul", __assign({}, props, { className: prefixClass('list', className) }), items.map(function (item, index) {
        var before = null;
        if (renderBefore) {
            before = React.createElement("span", { className: prefixClass('list-item-before') }, renderBefore(item, index));
        }
        return (React.createElement("li", { className: prefixClass('list-item'), key: keyExtractor(item, index) },
            before,
            React.createElement("span", { className: prefixClass('list-item-main') }, renderItem(item, index))));
    })));
}
var tmp = React.memo(List);
export { tmp as List };
//# sourceMappingURL=List.js.map