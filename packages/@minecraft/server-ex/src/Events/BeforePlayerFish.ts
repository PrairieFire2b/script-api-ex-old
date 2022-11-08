import { Player, world, MinecraftItemTypes } from "@minecraft/server";
import { BeforeEvent, EventSignal } from "./types";

export class BeforePlayerFishEvent implements BeforeEvent {
    cancel = false;
    player?: Player;
}

export class BeforePlayerFishEventSignal implements EventSignal<BeforePlayerFishEvent> {
    #callbacks: ((arg: BeforePlayerFishEvent) => void)[] = [];
    constructor() {
        let event: BeforePlayerFishEvent;
        world.events.beforeItemUse.subscribe(arg => {
            if(arg.item.typeId === MinecraftItemTypes.fishingRod.id && event) {
                event = new BeforePlayerFishEvent;
                event.player = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                this.#callbacks.forEach(callback => callback(event));
                arg.cancel = event.cancel;
            }
        });
    }
    subscribe(callback: (arg: BeforePlayerFishEvent) => void): (arg: BeforePlayerFishEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: BeforePlayerFishEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
