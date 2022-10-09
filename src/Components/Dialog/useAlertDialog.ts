import { useCallback } from 'react';
import { useDialog } from './DialogContext';
import { AlertDialog } from './AlertDialog';

export function useAlertDialog() {
    const showDialog = useDialog();
    return useCallback(
        (message: string, title?: string) => {
            return showDialog(AlertDialog, { message, title });
        },
        [showDialog]
    );
}
