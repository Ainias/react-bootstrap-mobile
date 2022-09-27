import * as React from 'react';
import { useMemo } from 'react';
import { withMemo } from '../../helper/withMemo';
import { ButtonDialog } from './ButtonDialog';

export type ConfirmDialogProps = {
    title?: string;
    message: string;
    close: (confirmed: boolean) => void;
    cancelText?: string;
    confirmText?: string;
};

function ConfirmDialog({ title, message, close, cancelText = 'Cancel', confirmText = 'OK' }: ConfirmDialogProps) {
    // Variables
    const buttons = useMemo(
        () => [
            {
                text: confirmText,
                callback: () => close(true),
            },
            { text: cancelText, callback: () => close(false) },
        ],
        [cancelText, close, confirmText]
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

// Need ConfirmDialogMemo for autocompletion of phpstorm
const ConfirmDialogMemo = withMemo(ConfirmDialog);
export { ConfirmDialogMemo as ConfirmDialog };
