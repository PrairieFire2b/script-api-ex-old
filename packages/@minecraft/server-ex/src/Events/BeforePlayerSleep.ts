import { Block, Player, world, MinecraftBlockTypes } from "@minecraft/server";
import { BeforeEvent, BlockEvent, EventSignal } from "./types";

export class BeforePlayerSleepEvent implements BeforeEvent, BlockEvent {
    block?: Block;
    cancel = false;
    player?: Player;
}

export class BeforePlayerSleepEventSignal implements EventSignal<BeforePlayerSleepEvent> {
    #callbacks: ((arg: BeforePlayerSleepEvent) => void)[] = [];
    constructor() {
        let event: BeforePlayerSleepEvent;
        world.events.beforeItemUseOn.subscribe(arg => {
            let block = arg.source.dimension.getBlock(arg.blockLocation);
            if(!arg.source.isSneaking
                && block?.typeId === MinecraftBlockTypes.bed.id
                && block?.dimension.id === "minecraft:overworld"
                && world.getTime() >= 13000 && world.getTime() <= 23457) {
                event = new BeforePlayerSleepEvent;
                event.block = block;
                event.player = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                this.#callbacks.forEach(callback => callback(event));
                arg.cancel = event.cancel;
            }
        })
    }
    subscribe(callback: (arg: BeforePlayerSleepEvent) => void): (arg: BeforePlayerSleepEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: BeforePlayerSleepEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
