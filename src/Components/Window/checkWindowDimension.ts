import { WINDOW_MIN_HEIGHT, WINDOW_MIN_WIDTH, WindowDimension } from './WindowDimension';

export function checkWindowDimension(
    dimension: WindowDimension,
    minWidth = WINDOW_MIN_WIDTH,
    minHeight = WINDOW_MIN_HEIGHT
) {
    dimension.top = Math.max(dimension.top, 0);
    dimension.left = Math.max(dimension.left, 0);
    dimension.right = Math.max(dimension.right, 0);
    dimension.bottom = Math.max(dimension.bottom, 0);

    if (window.innerWidth < minWidth + dimension.left + dimension.right) {
        if (dimension.right >= dimension.left) {
            dimension.right = window.innerWidth - minWidth - dimension.left;
        } else {
            dimension.left = window.innerWidth - minWidth - dimension.right;
        }
    }

    if (window.innerHeight < minHeight + dimension.top + dimension.bottom) {
        if (dimension.bottom >= dimension.top) {
            dimension.bottom = window.innerHeight - minHeight - dimension.top;
        } else {
            dimension.top = window.innerHeight - minHeight - dimension.bottom;
        }
    }

    return dimension;
}
