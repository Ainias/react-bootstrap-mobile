import React, { ComponentType, useContext } from 'react';
import { EmptyProps } from '../../helper/EmptyProps';

export type ShowDialog = <
    P = EmptyProps,
    R = any,
    C extends ComponentType<(P & { close: (result?: R) => void }) | P> = ComponentType<
        (P & { close: (result?: R) => void }) | P
    >
>(
    dialog: C,
    props?: Omit<P, 'close'>
) => Promise<R | void>;

const DialogContext = React.createContext<ShowDialog>(() => Promise.reject());
export const DialogProvider = DialogContext.Provider;

export function useDialog() {
    return useContext(DialogContext);
}
