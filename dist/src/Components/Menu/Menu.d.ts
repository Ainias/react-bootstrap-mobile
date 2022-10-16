/// <reference types="react" />
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
export declare type MenuItem = {
    label: string;
    callback: () => void;
    icon?: IconSource;
    key: string;
};
export declare type MenuProps = RbmComponentProps<{
    items: MenuItem[];
    x: number;
    y: number;
    isOpen: boolean;
    onClose: () => void;
}, WithNoChildren>;
declare function Menu({ className, style, items, y, x, isOpen, onClose }: MenuProps): JSX.Element | null;
declare const MenuMemo: typeof Menu;
export { MenuMemo as Menu };
