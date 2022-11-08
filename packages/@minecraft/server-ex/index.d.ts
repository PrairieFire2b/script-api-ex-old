import { Block, Entity, EntityDamageCause, Player } from "@minecraft/server";

export interface BeforeEvent extends Event {
    cancel?: boolean;
}

export interface BlockEvent extends Event {
    block?: Block;
}

export class BeforeFlintIgniteEvent implements BeforeEvent, BlockEvent {
    block?: Block;
    cancel: boolean;
    source?: Player;
}

export class BeforeFlintIgniteEventSignal implements EventSignal<BeforeFlintIgniteEvent> {
    constructor();
    subscribe(callback: (arg: BeforeFlintIgniteEvent) => void): (arg: BeforeFlintIgniteEvent) => void;
    unsubscribe(callback: (arg: BeforeFlintIgniteEvent) => void): void;
}

export class BeforePlayerSleepEvent implements BeforeEvent, BlockEvent {
    block?: Block;
    cancel: boolean;
    player?: Player;
}

export class BeforePlayerSleepEventSignal implements EventSignal<BeforePlayerSleepEvent> {
    #private;
    constructor();
    subscribe(callback: (arg: BeforePlayerSleepEvent) => void): (arg: BeforePlayerSleepEvent) => void;
    unsubscribe(callback: (arg: BeforePlayerSleepEvent) => void): void;
}

export class EntityDieEvent implements Event {
    cause?: EntityDamageCause;
    entity?: Entity;
}

export class EntityDieEventSignal implements EventSignal<EntityDieEvent> {
    #callbacks: ((arg: EntityDieEvent) => void)[];
    constructor();
    subscribe(callback: (arg: EntityDieEvent) => void): (arg: EntityDieEvent) => void;
    unsubscribe(callback: (arg: EntityDieEvent) => void): void;
}

export interface Event {
}

export class Events {
    [eventName: string]: EventSignal | Function;
    beforeFlintIgnite: BeforeFlintIgniteEventSignal;
    beforePlayerSleep: BeforePlayerSleepEventSignal;
    entityDie: EntityDieEventSignal;
    fishingHookThrow: FishingHookThrowEventSignal;
    playerDie: PlayerDieEventSignal;
    registerEventSignal<T extends EventSignal>(eventName: string, eventSignal: T): void;
}

export interface EventSignal<T extends Event = any> {
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
}

export class FishingHookThrowEvent implements Event {
    entity?: Entity;
    source?: Player;
}

export class FishingHookThrowEventSignal implements EventSignal<FishingHookThrowEvent> {
    constructor();
    subscribe(callback: (arg: FishingHookThrowEvent) => void): (arg: FishingHookThrowEvent) => void;
    unsubscribe(callback: (arg: FishingHookThrowEvent) => void): void;
}

export class PlayerDieEvent implements Event {
    player?: Player;
}

export class PlayerDieEventSignal implements EventSignal<PlayerDieEvent> {
    constructor();
    subscribe(callback: (arg: PlayerDieEvent) => void): (arg: PlayerDieEvent) => void;
    unsubscribe(callback: (arg: PlayerDieEvent) => void): void;
}

export class World {
    events: Events;
}
