import { useEffect, useState } from 'react';

export const useStrictEnabled = (loading = false) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        let animation: any;

        if (!loading) {
            animation = requestAnimationFrame(() => setEnabled(true));
        }

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, [loading]);

    return enabled;
};
