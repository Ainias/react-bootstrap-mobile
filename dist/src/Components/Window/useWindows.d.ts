export declare function useWindows(): (id: string) => {
    id: string;
    isActive: boolean;
    onActive: (_: any, newId?: string | undefined) => void;
};
