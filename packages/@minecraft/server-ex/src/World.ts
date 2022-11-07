import { Block, Entity, Location, Player, world } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes } from "@minecraft/server";

export interface BeforeEvent {
    cancel: boolean;
}

export class BeforePlayerSleepEvent implements BeforeEvent {
    block?: Block;
    cancel = false;
    player?: Player;
}

export class BeforePlayerSleepEventSignal implements EventSignal<BeforePlayerSleepEvent> {
    #callbacks: ((arg: BeforePlayerSleepEvent) => void)[] = [];
    constructor() {
        let event: BeforePlayerSleepEvent;
        world.events.beforeItemUseOn.subscribe((arg) => {
            let block = arg.source.dimension.getBlock(arg.blockLocation);
            if(block?.typeId === MinecraftBlockTypes.bed.id
                && block?.dimension.id === "minecraft:overworld"
                && world.getTime() >= 13000 && world.getTime() <= 23000) {
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

export interface Event {
}

export class Events {
    [eventName: string]: EventSignal<any>;
    beforePlayerSleep = new BeforePlayerSleepEventSignal;
    fishingHookThrow = new FishingHookThrowEventSignal;
}

export interface EventSignal<T extends BeforeEvent | Event> {
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
}

export class FishingHookThrowEvent implements Event {
    entity?: Entity;
    source?: Player;
}

export class FishingHookThrowEventSignal implements EventSignal<FishingHookThrowEvent> {
    #callbacks: ((arg: FishingHookThrowEvent) => void)[] = [];
    constructor() {
        let event: FishingHookThrowEvent;
        let location: Location;
        world.events.itemUse.subscribe((arg) => {
            if(arg.item.typeId === MinecraftItemTypes.fishingRod.id) {
                event = new FishingHookThrowEvent;
                event.source = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                location = event.source.headLocation;
            }
        });
        world.events.entityCreate.subscribe((arg) => {
            if(arg.entity.typeId === MinecraftEntityTypes.fishingHook.id) {
                if(location.isNear(arg.entity.headLocation, 0.36)) {
                    event.entity = arg.entity;
                    this.#callbacks.forEach(callback => callback(event));
                }
            }
        });
    }
    subscribe(callback: (arg: FishingHookThrowEvent) => void): (arg: FishingHookThrowEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: FishingHookThrowEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}

export class World {
    events = new Events;
}
