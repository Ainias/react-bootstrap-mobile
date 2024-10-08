import { MutableRefObject, useEffect, useRef } from 'react';

export function useOnChangeDone(onChangeDone: (ev: any) => void, ref?: MutableRefObject<HTMLInputElement| HTMLTextAreaElement | null>) {
    const innerRef = useRef<HTMLInputElement>(null);
    const usedRef = ref ?? innerRef;

    useEffect(() => {
        const elem = usedRef.current;
        elem?.addEventListener('change', onChangeDone);
        return () => {
            elem?.removeEventListener('change', onChangeDone);
        };
    }, [onChangeDone, usedRef]);

    return usedRef;
}
