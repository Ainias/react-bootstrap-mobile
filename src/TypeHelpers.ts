export type Override<T1, T2> = Omit<T1, keyof T2> & T2;
export type Conditional<T1, T2> = Partial<T1> | (T1 & T2);
export type ValueOf<T> = T[keyof T];
export type Recursive<T> = T | T[] | Recursive<T>[];
