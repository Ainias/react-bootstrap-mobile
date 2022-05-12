import { useEffect, useState } from 'react';

export enum Breakpoints {
    XS = 0,
    SM = 576,
    MD = 768,
    LG = 992,
    XL = 1200,
    XXL = 1400,
}

const resolveBreakpoint = (width: number) => {
    if (width >= Breakpoints.XXL) {
        return Breakpoints.XXL;
    }
    if (width >= Breakpoints.XL) {
        return Breakpoints.XL;
    }
    if (width >= Breakpoints.LG) {
        return Breakpoints.LG;
    }
    if (width >= Breakpoints.MD) {
        return Breakpoints.MD;
    }
    if (width >= Breakpoints.SM) {
        return Breakpoints.SM;
    }
    return Breakpoints.XS;
};

export const useBreakpoint = () => {
    const [size, setSize] = useState(Breakpoints.SM);

    useEffect(() => {
        setSize(resolveBreakpoint(window.innerWidth));
        const calcInnerWidth = () => setTimeout(() => setSize(resolveBreakpoint(window.innerWidth)), 200);

        window.addEventListener('resize', calcInnerWidth);
        return () => window.removeEventListener('resize', calcInnerWidth);
    }, []);

    return size;
};

export function useBreakpointSelect<T1, T2, T3, T4, T5, T6>(breakpointValues: [T1, T2, T3, T4, T5, T6]) {
    const size = useBreakpoint();

    switch (size) {
        case Breakpoints.XS:
            return breakpointValues[0];
        case Breakpoints.SM:
            return breakpointValues[1];
        case Breakpoints.MD:
            return breakpointValues[2];
        case Breakpoints.LG:
            return breakpointValues[3];
        case Breakpoints.XL:
            return breakpointValues[4];
        default:
            return breakpointValues[5];
    }
}
