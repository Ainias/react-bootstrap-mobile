import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Container } from '../Layout/Container';

import styles from './toast.scss';
import classNames from 'classnames';
import { withMemo } from '../../helper/withMemo';
import { EmptyProps } from '../../helper/EmptyProps';
import { useCallback, useRef, useState } from "react";
import { ObjectHelper, URecord } from "@ainias42/js-helper";
import { Toast } from "./Toast";
import { Text } from "../Text/Text";
import { ToastContext } from "./ToastContext";

export type ToastContainerProps = RbmComponentProps<EmptyProps>;

function ToastContainer({className, children, style}: ToastContainerProps) {
    // Variables

    // States
    const lastId = useRef(0);
    const [toasts, setToasts] = useState<URecord<number, {
        id: number,
        text: string,
        duration: number,
        action?: { name: string, onClick: (data?: any) => void, onClickData?: any }
    }>>({});

    // Refs

    // Callbacks
    const removeToast = useCallback((id: number) => {
        setToasts((oldToasts) => {
            const newToasts = {...oldToasts};
            delete newToasts[id];
            return newToasts;
        });
    }, []);

    const addToast = useCallback((
        text: string,
        action?: {
            name: string,
            onClick: (data?: any) => void,
            onClickData?: any
        },
        duration = 2500
    ) => {
        lastId.current++;
        const id = lastId.current;

        setToasts((oldToasts) => {
            return {
                ...oldToasts,
                [id]: {
                    id,
                    text,
                    duration,
                    action
                }
            };
        });
    }, []);

    // Effects

    // Other

    // Render Functions

    return (
        <ToastContext.Provider value={addToast}>
            {children}
            <Container className={classNames(styles.toastContainer, className)} fluid __allowChildren="all"
                       style={style}>
                {ObjectHelper.values(toasts).map((toast) => <Toast key={toast.id}
                                                                   timeToShow={toast.duration}
                                                                   onDismissed={removeToast}
                                                                   onDismissedData={toast.id} {...(toast.action ? {
                    ...toast.action,
                    actionName: toast.action.name
                } : {})}>
                    <Text>{toast.text}</Text>
                </Toast>)}
            </Container>
        </ToastContext.Provider>
    );
}

const ToastContainerMemo = withMemo(ToastContainer, styles);
export { ToastContainerMemo as ToastContainer };
