import * as server from "@minecraft/server";
import { Block, Dimension, Entity, EntityDamageCause, EntityHealthComponent, ItemStack, Location, Player, world} from "@minecraft/server";
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

export class BeforePlayerFishEvent implements BeforeEvent {
    cancel = false;
    player?: Player;
}

export class BeforePlayerFishEventSignal implements EventSignal<BeforePlayerFishEvent> {
    #callbacks: ((arg: BeforePlayerFishEvent) => void)[] = [];
    constructor() {
        let event: BeforePlayerFishEvent;
        world.events.beforeItemUse.subscribe(arg => {
            if(arg.item.typeId === MinecraftItemTypes.fishingRod.id && event) {
                event = new BeforePlayerFishEvent;
                event.player = Array.from(world.getPlayers({name: arg.source.nameTag}))[0];
                this.#callbacks.forEach(callback => callback(event));
                arg.cancel = event.cancel;
            }
        });
    }
    subscribe(callback: (arg: BeforePlayerFishEvent) => void): (arg: BeforePlayerFishEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: BeforePlayerFishEvent) => void): void {
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


export default class Events {
    [eventName: string | keyof server.Events]: EventSignal | Function;
    readonly beforeChat = server.world.events.beforeChat;
    readonly beforeDataDrivenEntityTriggerEvent = server.world.events.beforeDataDrivenEntityTriggerEvent;
    readonly beforeExplosion = server.world.events.beforeExplosion;
    readonly beforeFlintIgnite = new BeforeFlintIgniteEventSignal;
    readonly beforeItemDefinitionEvent = server.world.events.beforeItemDefinitionEvent;
    readonly beforeItemUse = server.world.events.beforeItemUse;
    readonly beforeItemUseOn = server.world.events.beforeItemUseOn;
    readonly beforePistonActivate = server.world.events.beforePistonActivate;
    readonly beforePlayerFish = new BeforePlayerFishEventSignal;
    readonly beforePlayerSleep = new BeforePlayerSleepEventSignal;
    readonly blockBreak = server.world.events.blockBreak;
    readonly blockExplode = server.world.events.blockExplode;
    readonly blockPlace = server.world.events.blockPlace;
    readonly buttonPush = server.world.events.buttonPush;
    readonly chat = server.world.events.chat;
    readonly dataDrivenEntityTriggerEvent = server.world.events.dataDrivenEntityTriggerEvent;
    readonly effectAdd = server.world.events.effectAdd;
    readonly entityCreate = server.world.events.entityCreate;
    readonly entityDie = new EntityDieEventSignal;
    readonly entityHit = server.world.events.entityHit;
    readonly entityHurt = server.world.events.entityHurt;
    readonly explosion = server.world.events.explosion;
    readonly itemCompleteCharge = server.world.events.itemCompleteCharge;
    readonly itemDefinitionEvent =server.world.events.itemDefinitionEvent;
    readonly itemReleaseCharge = server.world.events.itemReleaseCharge;
    readonly itemStartCharge = server.world.events.itemStartCharge;
    readonly itemStartUseOn = server.world.events.itemStartUseOn;
    readonly itemStopCharge = server.world.events.itemStopCharge;
    readonly itemStopUseOn = server.world.events.itemStopUseOn;
    readonly itemUse = server.world.events.itemUse;
    readonly itemUseOn = server.world.events.itemUseOn;
    readonly leverActivate = server.world.events.leverActivate;
    readonly messageReceive = server.world.events.messageReceive;
    readonly pistonActivate = server.world.events.pistonActivate;
    readonly playerDie = new PlayerDieEventSignal;
    readonly playerFish = new PlayerFishEventSignal;
    readonly playerJoin = server.world.events.playerJoin;
    readonly playerLeave = server.world.events.playerLeave;
    readonly playerShoot = new PlayerShootEventSignal;
    readonly playerSwitchDimension = new PlayerSwitchDimensionEventSignal;
    readonly projectileHit = server.world.events.projectileHit;
    readonly tick = server.world.events.tick;
    readonly weatherChange = server.world.events.weatherChange;
    readonly worldInitialize = server.world.events.worldInitialize;
    registerEventSignal<T extends EventSignal>(eventName: string, eventSignal: T) {
        if(!(eventName in this)) this[eventName] = eventSignal;
    }
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

export class PlayerFishEvent implements Event {
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
            if(arg.entity.typeId === MinecraftEntityTypes.fishingHook.id) {
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

export class PlayerShootEvent implements Event {
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

export class PlayerSleepEvent implements BlockEvent {
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

export class PlayerSwitchDimensionEvent implements Event {
    from?: Dimension;
    player?: Player;
    to?: Dimension;
}

export class PlayerSwitchDimensionEventSignal implements EventSignal<PlayerSwitchDimensionEvent> {
    #callbacks: ((arg: PlayerSwitchDimensionEvent) => void)[] = [];
    constructor() {
        let event: PlayerSwitchDimensionEvent;
        let players = Array.from(world.getPlayers());
        let playerDimensions = players.map(p => p.dimension.id);
        world.events.tick.subscribe(arg => {
            let players2 = Array.from(world.getPlayers());
            players2.forEach(player => {
                let op: Player | undefined = undefined;
                for (op of players)
                    if (op.name === player.name) break;
                if(op && playerDimensions[players.indexOf(op)] !== player.dimension.id) {
                    event = new PlayerSwitchDimensionEvent;
                    event.from = world.getDimension(playerDimensions[players.indexOf(op)]);
                    event.player = player;
                    event.to = player.dimension;
                    this.#callbacks.forEach(callback => callback(event));
                    playerDimensions[players.indexOf(op)] = player.dimension.id;
                }
            });
        })
        world.events.playerJoin.subscribe(arg => {
            players.push(arg.player);
            playerDimensions.push(arg.player.dimension.id);
        });
        world.events.playerLeave.subscribe(arg => {
            for(let player of players)
                if(player.name === arg.playerName) {
                    delete players[players.indexOf(player)];
                    delete playerDimensions[players.indexOf(player)];
            }
        });
    }
    subscribe(callback: (arg: PlayerSwitchDimensionEvent) => void): (arg: PlayerSwitchDimensionEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: PlayerSwitchDimensionEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
    
}
