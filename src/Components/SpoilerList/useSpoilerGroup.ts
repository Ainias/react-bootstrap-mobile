import { useCallback, useState } from 'react';

export type SpoilerGroupOptions = {
    closeWithClick: boolean;
    noClosingAnimation: boolean;
};

export function useSpoilerGroup(defaultKey?: number | string, options: Partial<SpoilerGroupOptions> = {}) {
    const [openKey, setOpenKey] = useState<number | string | undefined>(defaultKey);

    const onClick = useCallback(
        (isOpen: boolean, key: string | number) => {
            setOpenKey((oldKey) => {
                if (options?.closeWithClick && oldKey === key && !isOpen) {
                    return undefined;
                }
                if (isOpen) {
                    return key;
                }
                return oldKey;
            });
        },
        [options?.closeWithClick]
    );

    const createProps = useCallback(
        (key: string | number) => ({
            onClick,
            onClickData: key,
            key,
            open: key === openKey,
            noClosingAnimation: options?.noClosingAnimation !== false,
            closeIcon: null,
        }),
        [onClick, openKey, options?.noClosingAnimation]
    );

    return [createProps, openKey] as const;
}
