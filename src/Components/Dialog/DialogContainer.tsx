import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { ComponentType, PropsWithChildren, useCallback, useState } from 'react';
import { PromiseWithHandlers } from 'js-helper';
import { DialogProvider, ShowDialog } from './DialogContext';
import { Dialog } from './Dialog';
import { EmptyProps } from '../../helper/EmptyProps';

export type DialogContainerProps = PropsWithChildren<EmptyProps>;

type DialogData = {
    id: number;
    component: ComponentType;
    props?: Record<string, any>;
    resultPromise: PromiseWithHandlers<any>;
};

function DialogContainer({ children }: DialogContainerProps) {
    // Variables
    const [dialogs, setDialogs] = useState<DialogData[]>([]);
    const [, setLastId] = useState(0);

    // Refs

    // States

    // Selectors

    // Callbacks
    const showDialog: ShowDialog = useCallback((component, props) => {
        console.log('LOG-d showDialog', component, props);
        const promise = new PromiseWithHandlers<any>();
        setLastId((oldId) => {
            const id = oldId + 1;
            setDialogs((oldDialogs) => {
                return [...oldDialogs, { id, component, props, resultPromise: promise }];
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

    // Other

    // Render Functions

    return (
        <DialogProvider value={showDialog}>
            {children}
            {dialogs.map((d) => {
                const DialogComponent = d.component;
                return (
                    <Dialog {...d.props} key={d.id} onClose={onClose} identifier={d.id}>
                        <DialogComponent {...d.props} />
                    </Dialog>
                );
            })}
        </DialogProvider>
    );
}

// Need DialogContainerMemo for autocompletion of phpstorm
const DialogContainerMemo = withMemo(DialogContainer);
export { DialogContainerMemo as DialogContainer };
