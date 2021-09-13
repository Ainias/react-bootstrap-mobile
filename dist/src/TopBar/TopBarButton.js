import * as React from 'react';
import { useCallback } from 'react';
import { NavLink } from 'react-bootstrap';
export var TopBarButton = React.memo(function (_a) {
    var _b = _a.disabled, disabled = _b === void 0 ? false : _b, onClick = _a.onClick, children = _a.children;
    var cb = useCallback(function () { return (onClick ? onClick() : null); }, [onClick]);
    return (React.createElement(NavLink, { onClick: cb, disabled: disabled }, children));
});
//# sourceMappingURL=TopBarButton.js.map