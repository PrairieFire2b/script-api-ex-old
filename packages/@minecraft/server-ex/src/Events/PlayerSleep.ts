import { Block, Player, world, MinecraftBlockTypes } from "@minecraft/server";
import { BlockEvent, PlayerEvent, EventSignal } from "./types";

export class PlayerSleepEvent implements BlockEvent, PlayerEvent {
    block?: Block;
    player?: Player;
}

export class PlayerSleepEventSignal implements EventSignal<PlayerSleepEvent> {
    #callbacks: ((arg: PlayerSleepEvent) => void)[] = [];
    constructor() {
        let event: PlayerSleepEvent;
        world.events.itemUseOn.subscribe(arg => {
            let block = arg.source.dimension.getBlock(arg.blockLocation);
            if(!arg.source.isSneaking
                && block?.typeId === MinecraftBlockTypes.bed.id
                && block?.dimension.id === "minecraft:overworld"
                && world.getTime() >= 13000 && world.getTime() <= 23456) {
                event = new PlayerSleepEvent;
                event.block = block;
                event.player = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                this.#callbacks.forEach(callback => callback(event));
            }
        });
    }
    subscribe(callback: (arg: PlayerSleepEvent) => void): (arg: PlayerSleepEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: PlayerSleepEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
