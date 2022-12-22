import * as server from "@minecraft/server"

let intervalIndex: number = 0;

let timeoutIndex: number = 0;

let intervalSchedule: Function[] = [];

let timeoutSchedule: Function[] = [];

class System extends server.System {
    [Symbol.hasInstance](instance: any) {
        return instance instanceof server.System;
    }
    // @ts-ignore
    constructor() {
        // @ts-ignore
        return server.system;
    }
}

Object.assign(server.System.prototype, {
    clearInterval(id: number) {
        delete intervalSchedule[id];
    },
    clearTimeout(id: number) {
        delete timeoutSchedule[id];
    },
    setInterval<T extends any[]>(func: (...args: T) => void, delay: number = 0, ...args: T): number {
        const id = intervalIndex++;
        intervalSchedule.push(func);
        (async () => {
            let func = null;
            let startTime = Date.now();
            let canRun = false;
            while(await intervalSchedule[id]) {
                canRun = Date.now() - startTime >= delay;
                if(func && canRun) try {
                    func(...args), startTime = Date.now();
                } catch(error) {
                    console.error(`Uncaught ${error}`);
                } else if(!delay || Date.now() - startTime >= delay) func = intervalSchedule[id];
            }
            return this.clearInterval(id);
        })();
        return id;
    },
    setTimeout<T extends any[]>(func: (...args: T) => void, delay: number = 0, ...args: T): number {
        const id = timeoutIndex++;
        timeoutSchedule.push(func);
        if(delay <= 4) return func(...args), id;
        (async () => {
            let func = null;
            let startTime = Date.now();
            while(await timeoutSchedule[id]) {
                if(Date.now() - startTime >= delay) func = timeoutSchedule[id];
                if(func) return func(...args), this.clearTimeout(id);
            }
        })();
        return id;
    }
});

const system = server.system;

// @ts-ignore
Object.defineProperty(globalThis, "clearInterval", { value: server.System.prototype.clearInterval });

// @ts-ignore
Object.defineProperty(globalThis, "setInterval", { value: server.System.prototype.setInterval });

// @ts-ignore
Object.defineProperty(globalThis, "clearTimeout", { value: server.System.prototype.clearTimeout });

// @ts-ignore
Object.defineProperty(globalThis, "setTimeout", { value: server.System.prototype.setTimeout });

export { System, system };
