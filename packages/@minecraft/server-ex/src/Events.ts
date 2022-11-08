import { Block, Entity, EntityDamageCause, EntityHealthComponent, Location, Player, world} from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEntityTypes, MinecraftItemTypes } from "@minecraft/server";

export interface BeforeEvent extends Event {
    cancel?: boolean;
}

export interface BlockEvent extends Event {
    block?: Block;
}

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

export interface EventSignal<T extends Event = any> {
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
}

export class EntityDieEvent implements Event {
    cause?: EntityDamageCause;
    entity?: Entity;
}

export class EntityDieEventSignal implements EventSignal<EntityDieEvent> {
    #callbacks: ((arg: EntityDieEvent) => void)[] = [];
    constructor() {
        let component;
        let event: EntityDieEvent;
        world.events.entityHurt.subscribe((arg) => {
            component = arg.hurtEntity.getComponent("minecraft:health")
            if(component instanceof EntityHealthComponent) {
                if(component.current <= 0) {
                    event = new EntityDieEvent;
                    event.cause = arg.cause;
                    event.entity = arg.hurtEntity;
                    this.#callbacks.forEach(callback => callback(event));
                }
            }
        })
    }
    subscribe(callback: (arg: EntityDieEvent) => void): (arg: EntityDieEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: EntityDieEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
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
        world.events.itemUse.subscribe(arg => {
            if(arg.item.typeId === MinecraftItemTypes.fishingRod.id) {
                event = new FishingHookThrowEvent;
                event.source = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                location = event.source.headLocation;
            }
        });
        world.events.entityCreate.subscribe(arg => {
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

export class PlayerDieEvent implements Event {
    player?: Player;
}

export class PlayerDieEventSignal implements EventSignal<PlayerDieEvent> {
    #callbacks: ((arg: PlayerDieEvent) => void)[] = [];
    constructor() {
        let component;
        let event: PlayerDieEvent;
        world.events.entityHurt.subscribe((arg) => {
            component = arg.hurtEntity.getComponent("minecraft:health")
            if(arg.hurtEntity.typeId === MinecraftEntityTypes.player.id
                && component instanceof EntityHealthComponent) {
                if(component.current <= 0) {
                    event = new PlayerDieEvent;
                    event.player = Array.from(world.getPlayers({name: arg.hurtEntity.nameTag}))[0];
                    this.#callbacks.forEach(callback => callback(event));
                }
            }
        })
    }
    subscribe(callback: (arg: PlayerDieEvent) => void): (arg: PlayerDieEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: PlayerDieEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}
