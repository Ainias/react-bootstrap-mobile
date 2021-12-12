import * as React from 'react';
import { prefixClass } from '../helper';
function Body(_a) {
    // Variables
    var className = _a.className, children = _a.children, _b = _a.block, block = _b === void 0 ? false : _b, _c = _a.prio, prio = _c === void 0 ? 'primary' : _c, _d = _a.size, size = _d === void 0 ? 'medium' : _d;
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    var classes = ['body'];
    if (block)
        classes.push('block');
    classes.push(prio);
    classes.push(size);
    // Render Functions
    return React.createElement("span", { className: prefixClass(classes, className) }, children);
}
var tmp = React.memo(Body);
export { tmp as Body };
//# sourceMappingURL=Body.js.map