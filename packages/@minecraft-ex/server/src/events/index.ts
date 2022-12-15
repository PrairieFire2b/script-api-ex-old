import { EventSignal } from "./types";

class EventSignalConstructor<T> implements EventSignal<T> {
    #callbacks: ((arg: T) => void)[] = [];
    call?: (arg: T) => void;
    static from<T>(eventSignalLike: EventSignal<T>, predicate?: { [P in keyof T]?: T[P][] } | ((arg: T) => boolean)): EventSignal<T> {
        let eventSignal = new EventSignalConstructor<T>(true);
        let call = eventSignal.call;
        eventSignalLike.subscribe(arg => {
            let valid = true;
            if(typeof predicate == "function") valid = predicate(arg);
            else if(typeof predicate == "object") Object.keys(predicate).// @ts-ignore // what the f**k it cannot be passed
                forEach(key => valid = typeof predicate[key] == "function" ? predicate[key](arg[key]) : // @ts-ignore
                    predicate[key] instanceof Array ? predicate[key].includes(arg[key]) : true);
            if(valid && call) call(arg);
        });
        eventSignal.call = undefined;
        return eventSignal;
    }
    constructor(call: true | false = false) {
        if(call) this.call = (arg: T) => this.#callbacks.forEach(callback => callback(arg));
    }
    filter(predicate: { [P in keyof T]?: T[P][] } | ((arg: T) => boolean)) {
        let eventSignal = new EventSignalConstructor<T>(true);
        let call = eventSignal.call;
        this.subscribe(arg => {
            let valid = true;
            if(typeof predicate == "function") valid = predicate(arg);
            else if(typeof predicate == "object") Object.keys(predicate).// @ts-ignore // what the f**k it cannot be passed
                forEach(key => valid = typeof predicate[key] == "function" ? predicate[key](arg[key]) : // @ts-ignore
                    predicate[key] instanceof Array ? predicate[key].includes(arg[key]) : true);
            if(valid && call) call(arg);
        });
        eventSignal.call = undefined;
        return eventSignal;
    }
    subscribe(callback: (arg: T) => void): (arg: T) => void {
        return this.#callbacks[this.#callbacks.length] = callback;
    }
    unsubscribe(callback: (arg: T) => void): void {
        delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}

let EventSignal = function<T>(): EventSignal<T> {
    if(!new.target) {
        let error = new TypeError("must be called with new");
        throw error.stack = error.stack?.replace(/\((.*).js:([0-9])\)*/, "(native)"), error;
    }
    return new EventSignalConstructor<T>();
}

EventSignal = Object.assign(EventSignal, {
    from: EventSignalConstructor.from
});

export { EventSignal };
