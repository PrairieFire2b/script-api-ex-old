import { Entity, Location, Player, world, MinecraftItemTypes, MinecraftEntityTypes } from "@minecraft/server";
import { PlayerEvent, EventSignal } from "./types";

export class PlayerFishEvent implements PlayerEvent {
    entity?: Entity;
    player?: Player;
}

export class PlayerFishEventSignal implements EventSignal<PlayerFishEvent> {
    #callbacks: ((arg: PlayerFishEvent) => void)[] = [];
    constructor() {
        let event: PlayerFishEvent;
        let location: Location;
        world.events.itemUse.subscribe(arg => {
            if(arg.item.typeId === MinecraftItemTypes.fishingRod.id) {
                event = new PlayerFishEvent;
                event.player = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                location = arg.source.headLocation;
            }
        });
        world.events.entityCreate.subscribe(arg => {
            if(event && arg.entity.typeId === MinecraftEntityTypes.fishingHook.id) {
                if(location.isNear(arg.entity.headLocation, 0.36)) {
                    event.entity = arg.entity;
                    this.#callbacks.forEach(callback => callback(event));
                }
            }
        });
    }
    subscribe(callback: (arg: PlayerFishEvent) => void): (arg: PlayerFishEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: PlayerFishEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
