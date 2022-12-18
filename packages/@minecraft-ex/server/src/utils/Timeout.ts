import * as server from "@minecraft/server"

let array: ((() => void) & { time: number })[] = [];

let index = -1;

server.world.events.tick.subscribe(() => {
    for(const id in array) {
        if(array[id].time-- == 0) {
            array[id]();
            delete array[id];
        }
        else continue;
    }
});

function clearTimeout(id: number) {
    delete array[id];
}

function setTimeout<T extends any[]>(callback: (...args: T) => void, delay: number = 1, ...args: T): number {
    return array[index++] = Object.assign(() => callback(...args), { time: delay }), index;
}

Object.defineProperty(globalThis, "clearTimeout", { value: clearTimeout });

Object.defineProperty(globalThis, "setTimeout", { value: setTimeout });

export { clearTimeout, setTimeout };
