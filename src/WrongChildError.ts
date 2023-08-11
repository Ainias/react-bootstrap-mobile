export class WrongChildError extends Error {
    public childValue: any;

    constructor(expectedType: string, gotType: string, child: any, component: string) {
        const value =
            typeof child === 'object' && child !== null
                ? `${child.toString()} - (${
                      child.displayName ?? child.name ?? child.type?.displayName ?? child.type?.name ?? child.type
                  })`
                : child;
        super(
            `Expected Children of type '${expectedType}' but got type '${gotType}' in component ${component}. Value of child is '${value}'`
        );
        this.name = 'WrongChildError';
        this.childValue = child;
    }
}
