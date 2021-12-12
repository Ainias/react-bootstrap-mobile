export function prefixClass(className) {
    var otherClasses = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherClasses[_i - 1] = arguments[_i];
    }
    var classNames = (Array.isArray(className) ? className : [className])
        .filter(function (c) { return c !== undefined; })
        .map(function (c) { return "rbm-".concat(c); });
    otherClasses.forEach(function (value) {
        if (Array.isArray(value)) {
            classNames.push.apply(classNames, value.filter(function (v) { return v !== undefined; }));
        }
        else if (value !== undefined) {
            classNames.push(value);
        }
    });
    return classNames.join(' ');
}
//# sourceMappingURL=helper.js.map