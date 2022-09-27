import { useCallback } from 'react';
import { useDialog } from './DialogContext';
import { ConfirmDialog } from './ConfirmDialog';

export function useConfirmDialog() {
    const showDialog = useDialog();
    return useCallback(
        (message: string, title?: string) => {
            return showDialog(ConfirmDialog, { message, title });
        },
        [showDialog]
    );
}
