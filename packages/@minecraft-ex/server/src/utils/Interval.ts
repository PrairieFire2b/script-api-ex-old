import * as server from "@minecraft/server"

let array: ((() => void) & { time: number })[] = [];

let index = -1;

server.world.events.tick.subscribe(() => {
    for(const id in array) if(array[id].time-- == 0) array[id](), array[id].time = 0;
});

function clearInterval(id: number) {
    delete array[id];
}

function setInterval<T extends any[]>(callback: (...args: T) => void, delay: number = 1, ...args: T): number {
    return array[index++] = Object.assign(() => callback(...args), { time: delay }), index;
}

Object.defineProperty(globalThis, "clearInterval", { value: clearInterval });

Object.defineProperty(globalThis, "setInterval", { value: setInterval });

export { clearInterval, setInterval };
