export declare const BreakpointNames: string[];
export declare enum Breakpoints {
    XS = 0,
    SM = 576,
    MD = 768,
    LG = 992,
    XL = 1200,
    XXL = 1400
}
export declare const useBreakpoint: () => Breakpoints;
export declare function useBreakpointSelect<T1, T2, T3, T4, T5, T6>(breakpointValues: [T1, T2, T3, T4, T5, T6]): T1 | T2 | T3 | T4 | T5 | T6;
