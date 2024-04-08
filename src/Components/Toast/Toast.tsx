import * as React from 'react';
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';
import { Clickable } from '../Clickable/Clickable';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Listener, OptionalListener, useListener } from '../Hooks/useListener';

import styles from './toast.scss';
import { withMemo } from '../../helper/withMemo';
import classNames from 'classnames';

type WithoutActionProps<DismissedData> = {
    timeToShow?: number;
} & OptionalListener<'onDismissed', DismissedData>;
type WithActionProps<ActionData, DismissedData> = WithoutActionProps<DismissedData> & {
    actionName: string;
} & Listener<'onClick', ActionData>;

export type ToastProps<ActionData, DismissedData> = RbmComponentProps<
    WithActionProps<ActionData, DismissedData> | WithoutActionProps<DismissedData>,
    WithNoStringAndChildrenProps
>;

function Toast<ActionData, DismissedData>({
    className,
    timeToShow = 0,
    children,
    style,
    ...otherProps
}: ToastProps<ActionData, DismissedData>) {
    // Variables

    const ANIMATION_DURATION = 250;

    // States
    const [hidingStart, setHidingStart] = useState<number>(0);
    const [startShow] = useState(new Date().getTime());
    const [isHidden, setIsHidden] = useState<boolean>(false);

    // Refs

    // Callbacks
    const updateHidingStart = useCallback(() => {
        setHidingStart((oldHidingStart) => (oldHidingStart > 0 ? oldHidingStart : new Date().getTime()));
        setTimeout(() => setIsHidden(true), ANIMATION_DURATION);
    }, [setHidingStart]);

    const onDismissed = useListener('onDismissed', otherProps);

    // Effects
    useEffect(() => {
        if (timeToShow > 0) {
            const diff = timeToShow + startShow - new Date().getTime();
            const timeout = setTimeout(updateHidingStart, diff);
            return () => {
                if (timeout) {
                    clearTimeout(timeout);
                }
            };
        }
        return undefined;
    }, [timeToShow, updateHidingStart, startShow]);

    useEffect(() => {
        if (hidingStart > 0) {
            const diff = hidingStart + ANIMATION_DURATION - new Date().getTime();
            if (diff > 0) {
                const timeout = setTimeout(() => onDismissed, diff);
                return () => {
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                };
            }
        }
        return undefined;
    }, [hidingStart, onDismissed, otherProps]);

    // Other

    // Render Functions
    if (isHidden) {
        console.log("LOG-d isHidden");
        return null;
    }

    let actionElement: ReactNode = null;
    if ('onClick' in otherProps) {
        actionElement = (
            <Clickable className={styles.action} {...otherProps} __allowChildren="all">
                {otherProps.actionName}
            </Clickable>
        );
    }

    return (
        <Clickable
            style={style}
            className={classNames(styles.toast, { [styles.hiding]: hidingStart > 0 }, className)}
            onClick={updateHidingStart}
            __allowChildren="all"
        >
            <span>{children}</span>
            {actionElement}
        </Clickable>
    );
}

const ToastMemo = withMemo(Toast, styles, 'text');
export { ToastMemo as Toast };
