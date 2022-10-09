import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { Icon, IconSource } from '../Icon/Icon';
import { Block } from '../Layout/Block';
import classNames from 'classnames';

import styles from './menu.scss';
import { Text } from '../Text/Text';
import { Clickable } from '../Clickable/Clickable';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { withRenderBrowserOnly } from '../../helper/withRenderBrowserOnly';

export type MenuItem = {
    label: string;
    callback: () => void;
    icon?: IconSource;
    key: string;
};

export type MenuProps = RbmComponentProps<
    { items: MenuItem[]; x: number; y: number; isOpen: boolean; onClose: () => void },
    WithNoChildren
>;

function Menu({ className, style, items, y, x, isOpen, onClose }: MenuProps) {
    // Variables

    // Refs
    const menuRef = useRef<HTMLDivElement>(null);

    // States
    const [innerX, setInnerX] = useState(x);
    const [innerY, setInnerY] = useState(y);

    // Selectors

    // Callbacks
    const callItemCallback = useCallback(
        (_, cb: () => void) => {
            onClose();
            cb();
        },
        [onClose]
    );

    // Effects
    useEffect(() => {
        if (isOpen) {
            const listener = (e: MouseEvent) => {
                if (!menuRef.current?.contains(e.target as Node)) {
                    onClose();
                }
            };
            window.addEventListener('mousedown', listener, { capture: true });
            return () => window.removeEventListener('mousedown', listener, { capture: true });
        }
        return undefined;
    }, [isOpen, onClose]);

    useLayoutEffect(() => {
        if (!menuRef.current) {
            return;
        }
        const { width } = getComputedStyle(menuRef.current);
        const newX = Math.min(x, window.innerWidth - parseFloat(width));
        setInnerX(newX);
    }, [x]);

    useLayoutEffect(() => {
        if (!menuRef.current) {
            return;
        }
        const height = parseFloat(getComputedStyle(menuRef.current).height);
        let newY = y;
        if (newY > window.innerHeight - height) {
            newY -= height;
        }
        setInnerY(newY);
    }, [y]);

    // Other

    // Render Functions
    if (!isOpen) {
        return null;
    }

    return (
        <Block
            className={classNames(className, styles.menu)}
            style={{ ...style, top: innerY, left: innerX }}
            ref={menuRef}
        >
            {items.map((item) => (
                <Clickable
                    onClick={callItemCallback}
                    onClickData={item.callback}
                    className={styles.item}
                    key={item.key}
                >
                    {!!item.icon && <Icon icon={item.icon} />}
                    <Text>{item.label}</Text>
                </Clickable>
            ))}
        </Block>
    );
}

// Need MenuMemo for autocompletion of phpstorm
const MenuMemo = withMemo(withRenderBrowserOnly(Menu), styles);
export { MenuMemo as Menu };
