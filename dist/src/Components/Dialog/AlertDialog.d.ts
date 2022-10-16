/// <reference types="react" />
export declare type AlertDialogProps = {
    title?: string;
    message: string;
    close: () => void;
    confirmText?: string;
};
declare function AlertDialog({ title, message, close, confirmText }: AlertDialogProps): JSX.Element;
declare const AlertDialogMemo: typeof AlertDialog;
export { AlertDialogMemo as AlertDialog };
