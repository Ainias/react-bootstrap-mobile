/// <reference types="react" />
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
export declare type ButtonDialogProps = RbmComponentProps<{
    title?: string;
    message: string;
    buttons: {
        text: string;
        callback: () => void;
    }[];
}, WithNoChildren>;
declare function ButtonDialog({ title, message, buttons, style, className }: ButtonDialogProps): JSX.Element;
declare const ButtonDialogMemo: typeof ButtonDialog;
export { ButtonDialogMemo as ButtonDialog };
