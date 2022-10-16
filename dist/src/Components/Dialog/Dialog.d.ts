import { RbmComponentProps } from '../RbmComponentProps';
import { ReactElement } from 'react';
export declare type DialogProps<ReturnData> = RbmComponentProps<{
    closable?: boolean;
    onClose?: (data?: ReturnData, identifier?: number) => void;
    identifier?: number;
}, {
    children: ReactElement<Record<string, any> & {
        close?: (data?: ReturnData) => void;
    }> | string | number;
}>;
declare function Dialog<ReturnData>({ style, children, className, closable, onClose, identifier, }: DialogProps<ReturnData>): JSX.Element | null;
declare const DialogMemo: typeof Dialog;
export { DialogMemo as Dialog };
