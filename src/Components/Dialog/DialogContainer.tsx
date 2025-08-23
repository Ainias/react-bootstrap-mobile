import * as React from 'react';
import { ComponentType, ForwardedRef, PropsWithChildren, useCallback, useImperativeHandle, useState } from 'react';
import { PromiseWithHandlers } from '@ainias42/js-helper';
import { DialogProvider, ShowDialog } from './DialogContext';
import { Dialog } from './Dialog';
import { Block } from "../Layout/Block";
import { withMemo } from "../../helper/withMemo";

export type DialogContainerProps = PropsWithChildren<{
    dialogClassName?: string
    ref?: ForwardedRef<DialogContainerRef>
}>;

type DialogData = {
    id: number;
    component: ComponentType;
    props?: Record<string, any>;
    resultPromise: PromiseWithHandlers<any>;
};

export type DialogContainerRef = {
    showDialog: ShowDialog;
}

export const DialogContainer = withMemo(function DialogContainer({
                                                                     children,
                                                                     dialogClassName,
                                                                     ref
                                                                 }: DialogContainerProps) {
    // Variables
    const [dialogs, setDialogs] = useState<DialogData[]>([]);
    const [, setLastId] = useState(0);

    // Refs

    // States

    // Selectors

    // Callbacks
    const showDialog: ShowDialog = useCallback((component, props) => {
        const promise = new PromiseWithHandlers<any>();
        setLastId((oldId) => {
            const id = oldId + 1;
            setDialogs((oldDialogs) => {
                return [...oldDialogs, {id, component, props, resultPromise: promise}] as DialogData[];
            });
            return id;
        });
        return promise;
    }, []);

    const onClose = useCallback((result?: any, id?: number) => {
        setDialogs((oldDialogs) =>
            oldDialogs.filter((d) => {
                if (d.id === id) {
                    d.resultPromise.resolve(result);
                    return false;
                }
                return true;
            })
        );
    }, []);

    // Effects
    useImperativeHandle(ref, () => ({
        showDialog
    }), [showDialog]);


    // Other

    // Render Functions

    return (
        <DialogProvider value={showDialog}>
            {children}
            <Block className={dialogClassName}>
                {dialogs.map((d) => {
                    const DialogComponent = d.component;
                    return (
                        <Dialog {...d.props} key={d.id} onClose={onClose} identifier={d.id}>
                            <DialogComponent {...d.props} />
                        </Dialog>
                    );
                })}
            </Block>
        </DialogProvider>
    );
});
