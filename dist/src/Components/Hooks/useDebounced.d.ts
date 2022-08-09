export declare function useDebounced<Args extends any[]>(callback: (...args: Args) => void | Promise<void>, dependencies: any[], delay?: number): (...newArgs: Args) => void;
