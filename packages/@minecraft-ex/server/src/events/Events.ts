import * as server from "@minecraft/server"
import { beforePlayerSelectedSlot } from "./BeforePlayerSelectedSlot";
import { beforePlayerSleep } from "./BeforePlayerSleep";
import { playerEnterDimension } from "./PlayerEnterDimension";

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
    beforePlayerSelectedSlot,
    beforePlayerSleep,
    playerEnterDimension
});

export { Events };
export { BeforePlayerSelectedSlotEvent, BeforePlayerSelectedSlotEventSignal } from "./BeforePlayerSelectedSlot"
export { BeforePlayerSleepEvent, BeforePlayerSleepEventSignal } from "./BeforePlayerSleep"
export { PlayerEnterDimensionEvent, PlayerEnterDimensionEventSignal } from "./PlayerEnterDimension"
