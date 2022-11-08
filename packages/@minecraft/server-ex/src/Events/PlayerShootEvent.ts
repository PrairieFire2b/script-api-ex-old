import { Entity, ItemStack, Player, world, MinecraftEntityTypes } from "@minecraft/server";
import { PlayerEvent, EventSignal } from "./types";

export class PlayerShootEvent implements PlayerEvent {
    entity?: Entity;
    itemStack?: ItemStack;
    lastTick?: number;
    player?: Player;
}

export class PlayerShootEventSignal implements EventSignal<PlayerShootEvent> {
    #callbacks: ((arg: PlayerShootEvent) => void)[] = [];
    constructor() {
        let event: PlayerShootEvent;
        world.events.itemStartCharge.subscribe(arg => {
            if(arg.source.typeId === MinecraftEntityTypes.player.id) {
                event = new PlayerShootEvent;
                event.itemStack = arg.itemStack;
                event.lastTick = arg.useDuration;
                event.player = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
            }
        });
        world.events.itemStopCharge.subscribe(arg => {
            if(arg.source.nameTag === event.player?.nameTag)
                event.lastTick = event.lastTick ?? 72000 - arg.useDuration;
        });
        world.events.entityCreate.subscribe(arg => {
            if (event.player?.headLocation.isNear(arg.entity.headLocation, 0.36)) {
                event.entity = arg.entity;
                this.#callbacks.forEach(callback => callback(event));
            }
        });
    }
    subscribe(callback: (arg: PlayerShootEvent) => void): (arg: PlayerShootEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: PlayerShootEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
