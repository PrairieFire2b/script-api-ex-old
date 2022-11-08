import { Block, Entity, Player } from "@minecraft/server";

export interface BeforeEvent extends Event {
    cancel?: boolean;
}

export interface BlockEvent extends Event {
    block?: Block;
}

export interface Event {
}

export interface EventSignal<T extends Event = any> {
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
} 

export interface EntityEvent extends Event {
    entity?: Entity;
}

export interface PlayerEvent extends Event {
    player?: Player;
}
