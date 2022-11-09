import { Dimension, Entity, Location, world } from "@minecraft/server";
import { TriggerEvent, TriggerEventSignal } from "./types";

export class CrystalExplodeTriggerEvent implements TriggerEvent {
    entity?: Entity;
    dimension?: Dimension;
    location?: Location;
};

export class CrystalExplodeTriggerEventSignal implements TriggerEventSignal<CrystalExplodeTriggerEvent> {
    #callbacks: ((arg: CrystalExplodeTriggerEvent) => void)[] = [];
    trigger(arg: CrystalExplodeTriggerEvent): void {
        let event = arg;
        arg.dimension?.runCommandAsync(`summon minecraft:ender_crystal ${arg.location?.x} ${arg.location?.y} ${arg?.location?.z} minecraft:crystal_explode`);
        world.events.entityCreate.subscribe(arg => {
            if(arg.entity.typeId === "minecraft:ender_crystal") {
                event.entity = arg.entity;
                this.#callbacks.forEach(callback => callback(event));
            }
        });
    }
    subscribe(callback: (arg: CrystalExplodeTriggerEvent) => void): (arg: CrystalExplodeTriggerEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: CrystalExplodeTriggerEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
