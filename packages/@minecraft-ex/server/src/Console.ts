import { toString } from "./Object";
import { world } from "@minecraft/server";

class Console {
    #data: any;
    #pipe: Function;
    constructor(pipe?: Function, style: { error?: string, log?: string, warn?: string } = {
        error: "[Scripting][error]-", log: "[Scripting][log]-", warn: "[Scripting][warn]-"
    }) {
        this.#pipe = pipe ?? ((message: string) => world.say(message));
        this.#data = { count: {}, style: style, time: {} };
    }
    assert(condition: boolean, ...args: any[]) {
        if(!condition) this.log("Assertion failed:", ...args);
    }
    count(label: string = "default") {
        if(this.#data.count[label]) this.#data.count[label]++;
        else this.#data.count[label] = 1;
        this.log(label, this.#data.count[label]);
    }
    countReset(label: string = "default") {
        if(this.#data.count[label]) delete this.#data.count[label];
        else this.error(`'${label}' does not exist'`);
    }
    error(...args: any[]) {
        let string = this.#data.style.error;
        args.forEach(value => string += toString(value) + " ");
        this.#pipe(string);
    }
    log(...args: any[]) {
        let string = this.#data.style.log;
        args.forEach(value => string += toString(value) + " ");
        this.#pipe(string);
    }
    time(label: string = "default") {
        if(this.#data.time[label]) this.error(label, "already exists");
        else this.#data.time[label] = Date.now();
    }
    timeLog(label: string = "default") {
        if(this.#data.time[label]) this.log(`${label}: ${this.#data.time[label] - Date.now()}ms`);
        else this.error(`${label} does not exist`);
    }
    timeEnd(label: string = "default") {
        this.timeLog(label);
        delete this.#data.time[label];
    }
    warn(...args: any[]) {
        let string = this.#data.style.error;
        args.forEach(value => string += toString(value) + " ");
        this.#pipe(string);
    }
}

export function injectConsole(pipe?: Function, style?: { error?: string, log?: string, warn?: string }) {
    globalThis.console = new Console(pipe, style);
    return globalThis.console;
}
