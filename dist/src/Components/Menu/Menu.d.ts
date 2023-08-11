import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
export type MenuItemType = {
    label: string;
    icon?: IconSource | {
        icon: IconSource;
        color: string;
    };
    key: string;
    className?: string;
    callback: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};
export type MenuProps = RbmComponentProps<{
    items?: MenuItemType[];
    x: number;
    y: number;
    isOpen: boolean;
    onClose: () => void;
    offsetX?: number;
    offsetY?: number;
}>;
export declare const Menu: ({ className, style, items, y, x, isOpen, onClose, children, offsetY, offsetX, }: MenuProps) => React.JSX.Element | null;
