import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';
import { Clickable } from '../Clickable/Clickable';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Listener, OptionalListener, useListener } from '../Hooks/useListener';

type WithoutActionProps<DismissedData> = {
    children: string;
    timeToShow?: number;
} & OptionalListener<'onDismissed', DismissedData>;
type WithActionProps<ActionData, DismissedData> = WithoutActionProps<DismissedData> & {
    actionName: string;
} & Listener<'onClick', ActionData>;

export type ToastProps<ActionData, DismissedData> = RbmComponentProps<
    WithActionProps<ActionData, DismissedData> | WithoutActionProps<DismissedData>
>;

let Toast = function Toast<ActionData, DismissedData>({
    className,
    timeToShow = 0,
    children,
    ...otherProps
}: ToastProps<ActionData, DismissedData>) {
    // Variables

    const ANIMATION_DURATION = 250;

    // States
    const [hidingStart, setHidingStart] = useState<number>(0);
    const [startShow] = useState(new Date().getTime());
    const isHidden = hidingStart > 0 && ANIMATION_DURATION + hidingStart < new Date().getTime();

    // Refs

    // Callbacks
    const updateHidingStart = useCallback(() => {
        setHidingStart((oldHidingStart) => (oldHidingStart > 0 ? oldHidingStart : new Date().getTime()));
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
        return null;
    }

    let actionElement: ReactNode = null;
    if ('onClick' in otherProps) {
        actionElement = (
            <Clickable className={prefixClass('toast-action')} {...otherProps}>
                {otherProps.actionName}
            </Clickable>
        );
    }

    const classes = ['toast'];
    if (hidingStart > 0) classes.push('hiding');

    return (
        <Clickable className={prefixClass(classes, className)} onClick={updateHidingStart}>
            <span className={prefixClass('toast-text')}>{children}</span>
            {actionElement}
        </Clickable>
    );
};
Toast = React.memo(Toast) as typeof Toast;
export { Toast };
