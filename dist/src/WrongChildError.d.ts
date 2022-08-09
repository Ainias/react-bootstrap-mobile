export declare class WrongChildError extends Error {
    childValue: any;
    constructor(expectedType: string, gotType: string, child: any, component: string);
}
