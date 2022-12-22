// Type definitions for Minecraft Bedrock Edition script APIs
// Project: https://github.com/PrairieFire2b/script-api-ex
// Definitions by: PrairieFire2b <https://github.com/PrairieFire2b>

/* *****************************************************************************
   Copyright (c) 2022 PrairieFire2b.
   ***************************************************************************** */
import * as server from "@minecraft/server"
export enum BlockPlaceMode {
    destroy = "destroy",
    keep = "keep",
    replace = "replace"
}
export enum ScoreboardOperator {
    add = "+=",
    divide = "/=",
    equals = "=",
    greater = ">",
    less = "<",
    unequals = "><",
    mod = "%=",
    multiply = "*=",
    subtract = "-="
}
export enum TitleRawSet {
    actionbar = "actionbar",
    subtitle = "subtitle",
    title = "title"
}
export interface RawMessage {
    rawtext?: (RawMessage | string)[];
    text?: string;
    translate?: string;
    with?: (RawMessage | string)[];
}
export interface CommandRawMessage {
    rawtext?: (CommandRawMessage | string)[];
    selector?: string;
    text?: string;
    translate?: string;
    with?: (CommandRawMessage | string)[];
}
export class BeforePlayerSelectSlotEvent {
    /**
     * If set to true, this will cancel the switch of slot.
     */
    cancel: boolean;
    /**
     * Returns the player that triggered this event.
     */
    readonly player: Player;
    /**
     * Returns the slot that the player selected.
     */
    readonly selectedSlot: number;
    /**
     * Returns the item stack of the selecting slot.
     */
    readonly selectingItem: ItemStack;
    /**
     * Returns the slot that the player is selecting.
     */
    readonly selectingSlot: number;
}
export class BeforePlayerSelectSlotEventSignal {
    protected constructor();
    /**
     * @remarks
     * Adds a callback that will be called when a player
     * try to sleep.
     * @param callback
     */
    subscribe(callback: (arg: BeforePlayerSelectSlotEvent) => void): (arg: BeforePlayerSelectSlotEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: BeforePlayerSelectSlotEvent) => void): void;
}
export class BeforePlayerSleepEvent {
    /**
     * Location of the bed being impacted.
     */
    readonly blockLocation: BlockLocation;
    /**
     * If set to true, this will cancel the bed use behavior.
     */
    cancel: boolean;
    /**
     * Returns the player that triggered this event.
     */
    readonly player: Player;
}
export class BeforePlayerSleepEventSignal {
    protected constructor();
    /**
     * @remarks
     * Adds a callback that will be called when a player
     * try to sleep.
     * @param callback
     */
    subscribe(callback: (arg: BeforePlayerSleepEvent) => void): (arg: BeforePlayerSleepEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: BeforePlayerSleepEvent) => void): void;
}
export class Block extends server.Block {
    /**
     * @returns
     * Returns a object describes the block type, for `JSON.stringify`.
     */
    toJSON(): any;
    /**
     * @returns
     * Returns a block identifier converted to a locale key string.
     */
    toLocaleString(): string;
}
export class BlockLocation extends server.BlockLocation {
    /**
     * @param vector
     * @remarks
     * Returns a block location from a vector.
     */
    static from(vector: server.Vector3): BlockLocation;
}
export class Container extends server.Container {
    static from<T extends server.Block | server.Entity | server.Player>(container: T)
        : T extends server.Block ? server.BlockInventoryComponentContainer | void
        : T extends server.Player ? server.PlayerInventoryComponentContainer
        : server.InventoryComponentContainer;
}
export class Dimension extends server.Dimension {
    /**
     * @remarks
     * Returns a dimension object.
     * @param dimensionId
     * Represents as the parameter of {@link server.world.getDimension}
     * @returns
     * The requested dimension
     * @throws
     * Throws if the given dimension name is invalid
     */
    constructor(dimensionId: string);
    /**
     * @remarks
     * Returns an array of all active players within the dimension.
     * @throws This function can throw errors.
     */
    getAllPlayers(): Player[];
    // @ts-ignore
    getPlayers(options?: server.EntityQueryOptions): Iterable<Player>;
    /**
     * @remarks
     * Tries to set a block.
     * @param identifier
     * @param blockLocation
     * @param mode
     * @throws This function can throw errors.
     */
    setBlock(identifier: string, blockLocation: BlockLocation, mode: BlockPlaceMode): server.Block;
}
export class Entity extends server.Entity {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    /**
     * @remarks
     * Override [Symbol.hasInstance]() to handle {@link Player} instanceof Entity correctly.
     * @param instance 
     */
    static [Symbol.hasInstance](instance: any): boolean;
    /**
     * @remarks
     * Creates a new entity (e.g., a mob) at the specified
     * location.
     * @param identifier
     * Identifier of the type of entity to spawn. If no namespace
     * is specified, 'minecraft:' is assumed.
     * @param dimension
     * The specified dimension to spawn.
     * @param location
     * The location at which to create the entity.
     * @returns
     * Newly created entity at the specified location.
     * @throws This function can throw errors.
     */
    constructor(identifier: string, dimension: server.Dimension, location: server.Vector3);
    /**
     * @remarks
     * Damages a set of entity by this entity.
     * @param amount
     * @param entities
     * The set of entity will be damaged.
     */
    damageEntities(amount: number, ...entities: Entity[]): void;
    toJSON(): any;
    /**
     * @returns
     * Returns a entity identifier converted to a locale key string.
     */
    toLocaleString(): string;
}
export class Events extends server.Events {
    /**
     * This event fires before a player changes
     * the selected slot. This event can be canceled;
     */
    readonly beforePlayerSelectSlot: BeforePlayerSelectSlotEventSignal;
    /**
     * This event fires before a player interacts with bed
     * and will fall asleep. The event can be canceled.
     */
    readonly beforePlayerSleep: BeforePlayerSleepEventSignal;
    /**
     * @todo
     * Not implement
     */
    readonly playerEnterDimension: PlayerEnterDimensionEventSignal;
    /**
     * @returns
     * Represents a reference that is {@link server.world.events}.
     */
    constructor();
}
export namespace global {
    /**
     * @see {@link system.clearInterval}
     */
    export function clearInterval(id: number): void;
    /**
     * @see {@link system.clearTimeout}
     */
    export function clearTimeout(id: number): void;
    /**
     * @see {@link system.setInterval}
     */
    export function setInterval<T extends any[]>(func: (...args: T) => void, delay?: number, ...args: T): number;
    /**
     * @see {@link system.setTimeout}
     */
    export function setTimeout<T extends any[]>(func: (...args: T) => void, delay?: number, ...args: T): number;
}
export class ItemStack extends server.ItemStack {
    /**
     * @returns
     * Returns a item identifier converted to a locale key string.
     */
    toLocaleString(): string;
}
export class Location extends server.Location {
    /**
     * @param vector
     * @remarks
     * Returns a location from a vector.
     */
    static from(vector: server.Vector3): Location;
    /**
     * @returns
     * Returns a object describes the item type, for `JSON.stringify`.
     */
    toJSON(): any;
}
export class MinecraftDimensionTypes {
    static readonly nether: Dimension;
    static readonly overworld: Dimension;
    static readonly theEnd: Dimension;
}
export class Player extends server.Player {
    readonly x: number;
    readonly y: number;
    readonly z: number;
    /**
     * @remarks
     * Returns a active player with the specified entity or name within the world.
     * @param playerLike
     * The name or entity of the player to get.
     * @returns
     * Returns the player object if it exists within the world
     * or undefined.
     */
    static from(playerLike: server.Entity | string): Player | void;
    readonly onScreenDisplay: ScreenDisplay;
    readonly target: Entity;
    /**
     * @remarks
     * Damages a set of entity by this entity.
     * @param amount
     * @param entities
     * The set of entity will be damaged.
     */
    damageEntities(amount: number, ...entities: server.Entity[]): void;
    /**
     * @returns
     * Returns a entity identifier converted to a locale key string.
     */
    toLocaleString(): string;
}
export class PlayerEnterDimensionEvent {
    dimension: Dimension
    enteringDimension: Dimension;
    location: Location;
    player: Player;
}
export class PlayerEnterDimensionEventSignal {
    protected constructor();
    /**
     * @remarks
     * Adds a callback that will be called when a player
     * enter a dimension.
     * @param callback
     */
    subscribe(callback: (arg: PlayerEnterDimensionEvent) => void): (arg: PlayerEnterDimensionEvent) => void;
    /**
     * @remarks
     * Removes a callback from being called.
     * @param callback
     * @throws This function can throw errors.
     */
    unsubscribe(callback: (arg: PlayerEnterDimensionEvent) => void): void;
}
export class ScreenDisplay extends server.ScreenDisplay {
    /**
     * @remarks
     * Set the action bar text - a piece of text that displays
     * beneath the title and above the hot-bar.
     * @param text
     * @throws This function can throw errors.
     */
    setActionBar(text: server.RawMessage | string): void;
}
export class Scoreboard extends server.Scoreboard {
    addObjective(objectiveId: string, displayName: string): ScoreboardObjective;
    clearObjectiveAtDisplaySlot(displaySlotId: string): ScoreboardObjective;
    /**
     * @returns
     * Represents a reference that is {@link server.world.scoreboard}.
     */
    constructor();
    getObjective(objectiveId: string): ScoreboardObjective;
    getObjectives(): ScoreboardObjective[];
    /**
     * @remarks
     * Removes all defined objectives.
     * @throws This function can throw errors.
     */
    removeObjectives(): void;
    setObjectiveAtDisplaySlot(
        displaySlotId: string,
        objectiveDisplaySetting: server.ScoreboardObjectiveDisplayOptions,
    ): ScoreboardObjective;
}
export class ScoreboardObjective extends server.ScoreboardObjective {
    /**
     * @remarks
     * Add a specific score for a participant.
     * @param participant 
     * @param count
     * @returns
     * If success, return true or false.
     */
    addScore(participant: server.ScoreboardIdentity, count: number): boolean;
    /**
     * @remarks
     * Operates a specific score for a participant.
     * @param participant
     * @param operation
     * The operation
     * @param other
     * The other one participant to operate with.
     * @param otherObjective
     * A optional parameter for the other participant.
     * @returns
     * If success, return true or false.
     */
    operateScore(
        participant: server.ScoreboardIdentity,
        operation: ScoreboardOperator,
        other: server.ScoreboardIdentity,
        otherObjective?: server.ScoreboardObjective | string
    ): boolean;
    /**
     * @remarks
     * Sets a specific score for a participant.
     * @param participant
     * @param count
     * The score will be set.
     * @throws This function can throw errors.
     */
    setScore(participant: server.ScoreboardIdentity, count: number): void;
}
export class System extends server.System {
    events: SystemEvents;
    /**
     * @remarks
     * Cancels the execution of a function run that was previously
     * scheduled via the `setTimeout` function.
     * This function is a polyfill of Web API for Script API.
     * @param id
     * @global
     * This function is defined in `globalThis`.
     */
    clearInterval(id: number): void;
    /**
     * @remarks
     * Cancels the execution of a scheduled function run that was
     * previously scheduled via the `setInterval` function.
     * This function is a polyfill of Web API for Script API.
     * @param id
     * @global
     * This function is defined in `globalThis`.
     */
    clearTimeout(id: number): void;
    /**
     * @returns
     * Represents a reference that is {@link server.system}.
     */
    constructor();
    /**
     * @remarks
     * Runs a specified function at a scheduled interval. This is
     * frequently used to implement delayed behaviors and game
     * loops.
     * This function is a polyfill of Web API for Script API.
     * @param func
     * Function to run on the specified schedule.
     * @param delay
     * The number of milliseconds to run this function within - run this
     * function every `delay` milliseconds.
     * @param args
     * The args for the function to call.
     * @returns
     * An opaque identifier that can be used with the
     * `clearInterval` function to cancel the execution of this
     * scheduled run.
     * @global
     * This function is defined in `globalThis`.
     */
    setInterval<T extends any[]>(func: (...args: T) => void, delay?: number, ...args: T): number;
    /**
     * @remarks
     * Runs a specified function at a future time. This is
     * frequently used to implement delayed behaviors.
     * This function is a polyfill of Web API for Script API.
     * @param func
     * Function to run when the delay time criteria is
     * met.
     * @param delay
     * The number of milliseconds to run this function after
     * `delay` milliseconds.
     * @param args
     * The args for the function to call.
     * @returns
     * An opaque identifier that can be used with the `clearTimeout`
     * function to cancel the execution of this run.
     * @global
     * This function is defined in `globalThis`.
     */
    setTimeout<T extends any[]>(func: (...args: T) => void, delay?: number, ...args: T): number;
}
export class SystemEvents extends server.SystemEvents {
    /**
     * @returns
     * Represents a reference that is {@link server.system.events}.
     */
    constructor();
}
export class World extends server.World {
    events: Events;
    /**
     * @returns
     * Represents a reference that is {@link server.world}.
     */
    constructor();
    // @ts-ignore
    getDimension(dimensionId: string | server.Dimension): Dimension;
    say(message: number | RawMessage | string): void;
}
export const world: World;
export const scoreboard: Scoreboard;
export const system: System;
export * from "@minecraft/server"
