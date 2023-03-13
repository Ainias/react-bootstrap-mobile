import React, { ComponentType } from 'react';
import { EmptyProps } from '../../helper/EmptyProps';
export type ShowDialog = <P = EmptyProps, R = any, C extends ComponentType<(P & {
    close: (result?: R) => void;
}) | P> = ComponentType<(P & {
    close: (result?: R) => void;
}) | P>>(dialog: C, props?: Omit<P, 'close'>) => Promise<R | void>;
export declare const DialogProvider: React.Provider<ShowDialog>;
export declare function useDialog(): ShowDialog;
