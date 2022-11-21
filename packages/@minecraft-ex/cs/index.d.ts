export class Console {
    assert(condition?: boolean, ...data: any[]): void;
    clear(): void;
    count(label?: string): void;
    countReset(label?: string): void;
    error(...data: any[]): void;
    log(...data: any[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: any[]): void;
    warn(...data: any[]): void;
}

/**
 * @usage call injectConsole() to use
 */
export const console: Console;

export function injectConsole(pipe: Function, style: any): Console;

export function injectObject(value: any): void;

export function toString(value: any): string;
