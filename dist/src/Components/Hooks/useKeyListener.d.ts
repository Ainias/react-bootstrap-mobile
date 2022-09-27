export declare function useKeyListener(key: KeyboardEvent['key'], listener: (e: KeyboardEvent) => void, dependencies?: any[], ignoreFormElements?: boolean): void;
export declare function useKeyUpListener(key: KeyboardEvent['key'], listener: (e: KeyboardEvent) => void, dependencies?: any[], ignoreFormElements?: boolean): void;
export declare function useKeyPressed(key: KeyboardEvent['key'], ignoreFormElements?: boolean, preventDefault?: boolean): boolean;
