import { Block, Player, world, MinecraftItemTypes } from "@minecraft/server";
import { BeforeEvent, BlockEvent, EventSignal } from "./types";

export class BeforeFlintIgniteEvent implements BeforeEvent, BlockEvent {
    block?: Block;
    cancel = false;
    source?: Player;
}

export class BeforeFlintIgniteEventSignal implements EventSignal<BeforeFlintIgniteEvent> {
    #callbacks: ((arg: BeforeFlintIgniteEvent) => void)[] = [];
    constructor() {
        let event: BeforeFlintIgniteEvent;
        world.events.beforeItemUseOn.subscribe((arg) => {
            if(arg.item.typeId === MinecraftItemTypes.flintAndSteel.id) {
                event = new BeforeFlintIgniteEvent;
                event.block = arg.source.dimension.getBlock(arg.blockLocation);
                event.source = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                this.#callbacks.forEach(callback => callback(event));
                arg.cancel = event.cancel;
            }
        });
    }
    subscribe(callback: (arg: BeforeFlintIgniteEvent) => void): (arg: BeforeFlintIgniteEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: BeforeFlintIgniteEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
