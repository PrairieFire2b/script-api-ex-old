import { Events, TriggerEvents } from "./Events/index";
import { world } from "@minecraft/server";

export class World {
    console = {
        error: globalThis.console.error,
        info: globalThis.console.info,
        log(...data: any[]) {
            console.log(...data);
            let message = "";
            data.forEach(value => message += (typeof value === "object" ? JSON.stringify(value) : String(value)) + " ");
            world.say(message);
        },
        warn: globalThis.console.warn
    }
    events = new Events;
    triggerEvents = new TriggerEvents;
}
