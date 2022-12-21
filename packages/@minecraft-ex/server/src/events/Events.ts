import * as server from "@minecraft/server"
import { beforePlayerSleepEventSignal } from "./BeforePlayerSleep";

class Events extends server.Events {
    [Symbol.hasInstance](instance: any) {
        return instance instanceof server.Events;
    }
    // @ts-ignore
    constructor() {
        // @ts-ignore
        return server.world.events;
    }
}

Object.assign(server.Events.prototype, {
    beforePlayerSleep: beforePlayerSleepEventSignal
});

export { Events };
export { BeforePlayerSleepEvent, BeforePlayerSleepEventSignal } from "./BeforePlayerSleep"
