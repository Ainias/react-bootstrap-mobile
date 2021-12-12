import * as React from 'react';
import { prefixClass } from '../helper';
function Grow(_a) {
    // Variables
    var className = _a.className, children = _a.children, _b = _a.center, center = _b === void 0 ? false : _b;
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    var classes = ['grow'];
    if (center)
        classes.push('center');
    // Render Functions
    return React.createElement("div", { className: prefixClass(classes, className) }, children);
}
var tmp = React.memo(Grow);
export { tmp as Grow };
//# sourceMappingURL=Grow.js.map