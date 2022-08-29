export declare type SpoilerGroupOptions = {
    closeWithClick: boolean;
    noClosingAnimation: boolean;
};
export declare function useSpoilerGroup(defaultKey?: number | string, options?: Partial<SpoilerGroupOptions>): readonly [(key: string | number) => {
    onClick: (isOpen: boolean, key: string | number) => void;
    onClickData: string | number;
    key: string | number;
    open: boolean;
    noClosingAnimation: boolean;
}, string | number | undefined];
