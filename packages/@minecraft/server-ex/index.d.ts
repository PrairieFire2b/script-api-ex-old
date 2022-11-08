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
    subscribe(callback: (arg: BeforeFlintIgniteEvent) => void): (arg: BeforeFlintIgniteEvent) => void;
    unsubscribe(callback: (arg: BeforeFlintIgniteEvent) => void): void;
}

export class BeforePlayerFishEvent implements BeforeEvent {
    cancel: boolean;
    entity?: Entity;
    source?: Player;
}

export class BeforePlayerFishEventSignal implements EventSignal<BeforePlayerFishEvent> {
    subscribe(callback: (arg: BeforePlayerFishEvent) => void): (arg: BeforePlayerFishEvent) => void;
    unsubscribe(callback: (arg: BeforePlayerFishEvent) => void): void;
}

export class BeforePlayerSleepEvent implements BeforeEvent, BlockEvent {
    block?: Block;
    cancel: boolean;
    player?: Player;
}

export class BeforePlayerSleepEventSignal implements EventSignal<BeforePlayerSleepEvent> {
    subscribe(callback: (arg: BeforePlayerSleepEvent) => void): (arg: BeforePlayerSleepEvent) => void;
    unsubscribe(callback: (arg: BeforePlayerSleepEvent) => void): void;
}

export class EntityDieEvent implements Event {
    cause?: EntityDamageCause;
    entity?: Entity;
}

export class EntityDieEventSignal implements EventSignal<EntityDieEvent> {
    subscribe(callback: (arg: EntityDieEvent) => void): (arg: EntityDieEvent) => void;
    unsubscribe(callback: (arg: EntityDieEvent) => void): void;
}

export interface Event {
}

export class Events {
    [eventName: string | keyof server.Events]: EventSignal | Function;
    readonly beforeChat: server.BeforeChatEventSignal;
    readonly beforeDataDrivenEntityTriggerEvent: server.BeforeDataDrivenEntityTriggerEventSignal;
    readonly beforeExplosion: server.BeforeExplosionEventSignal;
    readonly beforeFlintIgnite: BeforeFlintIgniteEventSignal;
    readonly beforeItemDefinitionEvent: server.BeforeItemDefinitionEventSignal;
    readonly beforeItemUse: server.BeforeItemUseEventSignal;
    readonly beforeItemUseOn: server.BeforeItemUseOnEventSignal;
    readonly beforePistonActivate: server.BeforePistonActivateEventSignal;
    readonly beforePlayerFish: BeforePlayerFishEventSignal;
    readonly beforePlayerSleep: BeforePlayerSleepEventSignal;
    readonly blockBreak: server.BlockBreakEventSignal;
    readonly blockExplode: server.BlockExplodeEventSignal;
    readonly blockPlace: server.BlockPlaceEventSignal;
    readonly buttonPush: server.ButtonPushEventSignal;
    readonly chat: server.ChatEventSignal;
    readonly dataDrivenEntityTriggerEvent: server.DataDrivenEntityTriggerEventSignal;
    readonly effectAdd: server.EffectAddEventSignal;
    readonly entityCreate: server.EntityCreateEventSignal;
    readonly entityDie: EntityDieEventSignal;
    readonly entityHit: server.EntityHitEventSignal;
    readonly entityHurt: server.EntityHurtEventSignal;
    readonly explosion: server.ExplosionEventSignal;
    readonly itemCompleteCharge: server.ItemCompleteChargeEventSignal;
    readonly itemDefinitionEvent: server.ItemDefinitionEventSignal;
    readonly itemReleaseCharge: server.ItemReleaseChargeEventSignal;
    readonly itemStartCharge: server.ItemStartChargeEventSignal;
    readonly itemStartUseOn: server.ItemStartUseOnEventSignal;
    readonly itemStopCharge: server.ItemStopChargeEventSignal;
    readonly itemStopUseOn: server.ItemStopUseOnEventSignal;
    readonly itemUse: server.ItemUseEventSignal;
    readonly itemUseOn: server.ItemUseOnEventSignal;
    readonly leverActivate: server.LeverActionEventSignal;
    readonly messageReceive: server.ServerMessageSignal;
    readonly pistonActivate: server.PistonActivateEventSignal;
    readonly playerDie: PlayerDieEventSignal;
    readonly playerFish: PlayerFishEventSignal;
    readonly playerJoin: server.PlayerJoinEventSignal;
    readonly playerLeave: server.PlayerLeaveEventSignal;
    readonly playerShoot: PlayerShootEventSignal;
    readonly playerSwitchDimension: PlayerSwitchDimensionEventSignal;
    readonly projectileHit: server.ProjectileHitEventSignal;
    readonly tick: server.TickEventSignal;
    readonly weatherChange: server.WeatherChangeEventSignal;
    readonly worldInitialize: server.WorldInitializeEventSignal;
    registerEventSignal<T extends EventSignal>(eventName: string, eventSignal: T): void;
}

export interface EventSignal<T extends Event = any> {
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
}

export class PlayerDieEvent implements Event {
    cause?: EntityDamageCause;
    player?: Player;
}

export class PlayerDieEventSignal implements EventSignal<PlayerDieEvent> {
    subscribe(callback: (arg: PlayerDieEvent) => void): (arg: PlayerDieEvent) => void;
    unsubscribe(callback: (arg: PlayerDieEvent) => void): void;
}

export class PlayerShootEvent implements Event {
    entity?: Entity;
    itemStack?: ItemStack;
    lastTick?: number;
    player?: Player;
}

export class PlayerShootEventSignal implements EventSignal<PlayerShootEvent> {
    subscribe(callback: (arg: PlayerShootEvent) => void): (arg: PlayerShootEvent) => void;
    unsubscribe(callback: (arg: PlayerShootEvent) => void): void;
}

export class PlayerFishEvent implements Event {
    entity?: Entity;
    source?: Player;
}

export class PlayerFishEventSignal implements EventSignal<PlayerFishEvent> {
    subscribe(callback: (arg: PlayerFishEvent) => void): (arg: PlayerFishEvent) => void;
    unsubscribe(callback: (arg: PlayerFishEvent) => void): void;
}

export class World {
    events: Events;
}

export class PlayerSwitchDimensionEvent implements Event {
    from?: Dimension;
    player?: Player;
    to?: Dimension;
}

export class PlayerSwitchDimensionEventSignal implements EventSignal<PlayerSwitchDimensionEvent> {
    subscribe(callback: (arg: PlayerSwitchDimensionEvent) => void): (arg: PlayerSwitchDimensionEvent) => void;
    unsubscribe(callback: (arg: PlayerSwitchDimensionEvent) => void): void;
}
