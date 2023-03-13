import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
export type MenuItem = {
    label: string;
    callback: () => void;
    icon?: IconSource;
    key: string;
};
export type MenuProps = RbmComponentProps<{
    items: MenuItem[];
    x: number;
    y: number;
    isOpen: boolean;
    onClose: () => void;
}, WithNoChildren>;
export declare const Menu: ({ className, style, items, y, x, isOpen, onClose }: MenuProps) => JSX.Element | null;
