declare module "nerdamer" {
    interface NerdamerInstance {
        evaluate(): string;
        solveFor(variable: string): NerdamerInstance;
        text(format?: string): string;
        toString(): string;
    }

    const nerdamer: {
        (expression: string): NerdamerInstance;
        addFunction(name: string, callback: (...args: any[]) => any): void;
        setFunction(name: string, callback: (...args: any[]) => any): void;
        solve(expression: string, variable?: string): NerdamerInstance;
        version: string;
        // Add other methods and properties as needed
    };

    export default nerdamer;
}

declare module "nerdamer/all.js" {
    import nerdamer from "nerdamer";
    export default nerdamer;
}