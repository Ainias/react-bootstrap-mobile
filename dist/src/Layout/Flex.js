import * as React from 'react';
import { prefixClass } from '../helper';
function Flex(_a) {
    // Variables
    var className = _a.className, children = _a.children, _b = _a.vertical, vertical = _b === void 0 ? false : _b;
    // States
    // Refs
    // Callbacks
    // Effects
    // Other
    var classes = ['flex'];
    if (vertical) {
        classes.push('vertical');
    }
    // Render Functions
    return React.createElement("div", { className: prefixClass(classes, className) }, children);
}
var tmp = React.memo(Flex);
export { tmp as Flex };
//# sourceMappingURL=Flex.js.map