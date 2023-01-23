export declare function useDelayed<Args extends any[]>(callback: (...args: Args) => void | Promise<void>, dependencies: any[], delay?: number, maxDelay?: number): (...newArgs: Args) => void;
