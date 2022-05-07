export function prefixClass(
    className: string | (string | undefined)[],
    ...otherClasses: (string | undefined | (string | undefined)[])[]
) {
    const classNames = (Array.isArray(className) ? className : [className])
        .filter((c) => c !== undefined)
        .map((c) => `rbm-${c}`);
    otherClasses.forEach((value) => {
        if (Array.isArray(value)) {
            classNames.push(...(value.filter((v) => v !== undefined) as string[]));
        } else if (value !== undefined) {
            classNames.push(value);
        }
    });

    return classNames.join(' ');
}

export function classes(...classNames: (string | undefined)[]) {
    return classNames.filter((c) => c !== undefined).join(' ');
}
