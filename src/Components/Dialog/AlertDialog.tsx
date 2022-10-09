import * as React from 'react';
import { useMemo } from 'react';
import { withMemo } from '../../helper/withMemo';
import { ButtonDialog } from './ButtonDialog';

export type AlertDialogProps = {
    title?: string;
    message: string;
    close: () => void;
    confirmText?: string;
};

function AlertDialog({ title, message, close, confirmText = 'OK' }: AlertDialogProps) {
    // Variables
    const buttons = useMemo(
        () => [
            {
                text: confirmText,
                callback: () => close(),
            },
        ],
        [close, confirmText]
    );

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return <ButtonDialog message={message} buttons={buttons} title={title} />;
}

// Need AlertDialogMemo for autocompletion of phpstorm
const AlertDialogMemo = withMemo(AlertDialog);
export { AlertDialogMemo as AlertDialog };
