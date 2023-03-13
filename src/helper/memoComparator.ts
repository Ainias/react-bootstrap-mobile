import { JsonHelper } from '@ainias42/js-helper';

export function memoComparator(prevProps: Readonly<any>, nextProps: Readonly<any>) {
    const keysPrev = Object.keys(prevProps);
    const keysNext = Object.keys(nextProps);

    if (keysPrev.length !== keysNext.length) {
        return false;
    }

    return keysPrev.every((key) => {
        if (key === 'style') {
            return JsonHelper.deepEqual(prevProps[key], nextProps[key]);
        }

        return prevProps[key] === nextProps[key];
    });
}
