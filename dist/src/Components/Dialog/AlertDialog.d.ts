import * as React from 'react';
export type AlertDialogProps = {
    title?: string;
    message: string;
    close: () => void;
    confirmText?: string;
};
declare function AlertDialog({ title, message, close, confirmText }: AlertDialogProps): React.JSX.Element;
declare const AlertDialogMemo: typeof AlertDialog;
export { AlertDialogMemo as AlertDialog };
