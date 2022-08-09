export declare type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export declare type Conditional<T1, T2> = Partial<T1> | (T1 & T2);
export declare type ValueOf<T> = T[keyof T];
export declare type Recursive<T> = T | T[] | Recursive<T>[];
