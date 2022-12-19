import * as server from "@minecraft/server"
import { EventSignal } from "./types"
import { BeforePlayerSelectedSlotEvent, BeforePlayerSelectedSlotEventSignal } from "./BeforePlayerSelectedSlot"
import { BeforePlayerSleepEvent, BeforePlayerSleepEventSignal } from "./BeforePlayerSleep";

class EventSignalConstructor<T> implements EventSignal<T> {
    #callbacks: ((arg: T) => void)[] = [];
    call?: (arg: T) => void;
    static [Symbol.hasInstance](instance: any) {
        return instance.subscribe?.length && instance.unsubscribe?.length;
    }
    static from<T>(eventSignalLike: EventSignal<T>, predicate?: { [P in keyof T]?: T[P][] } | ((arg: T) => boolean)): EventSignal<T> {
        let eventSignal = new EventSignalConstructor<T>(true);
        let call = eventSignal.call;
        eventSignalLike.subscribe(arg => {
            let valid = true;
            if(typeof predicate == "function") valid = predicate(arg);
            else if(typeof predicate == "object") Object.keys(predicate).// @ts-ignore // what the f**k it cannot be passed
                forEach(key => valid = typeof predicate[key] == "function" ? predicate[key](arg[key]) : // @ts-ignore
                    predicate[key] instanceof Array ? predicate[key].includes(arg[key]) : true);
            if(valid && call) call(arg);
        });
        eventSignal.call = undefined;
        return eventSignal;
    }
    constructor(call: true | false = false) {
        if(call) this.call = (arg: T) => this.#callbacks.forEach(callback => callback(arg));
    }
    subscribe(callback: (arg: T) => void): (arg: T) => void {
        return this.#callbacks[this.#callbacks.length] = callback;
    }
    unsubscribe(callback: (arg: T) => void): void {
        delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}

Object.defineProperty(EventSignalConstructor, "name", "EventSignal");

class MinecraftEventTypes {
    static beforeChat = server.world.events.beforeChat;
    static beforeDataDrivenEntityTriggerEvent = server.world.events.beforeDataDrivenEntityTriggerEvent;
    static beforeExplosion = server.world.events.beforeExplosion;
    static beforeItemDefinitionEvent = server.world.events.beforeItemDefinitionEvent;
    static beforeItemUse = server.world.events.beforeItemUse;
    static beforeItemUseOn = server.world.events.beforeItemUseOn;
    static beforePistonActivate = server.world.events.beforePistonActivate;
    static beforePlayerSelectedSlot = new BeforePlayerSelectedSlotEventSignal;
    static beforePlayerSleep = new BeforePlayerSleepEventSignal;
    static blockBreak = server.world.events.blockBreak;
    static blockExplode = server.world.events.blockExplode;
    static blockPlace = server.world.events.blockPlace;
    static buttonPush = server.world.events.buttonPush;
    static chat = server.world.events.chat;
    static dataDrivenEntityTriggerEvent = server.world.events.dataDrivenEntityTriggerEvent;
    static effectAdd = server.world.events.effectAdd;
    static entitySpawn = server.world.events.entitySpawn;
    static entityHit = server.world.events.entityHit;
    static entityHurt = server.world.events.entityHurt;
    static explosion = server.world.events.explosion;
    static itemCompleteCharge = server.world.events.itemCompleteCharge;
    static itemDefinitionEvent =server.world.events.itemDefinitionEvent;
    static itemReleaseCharge = server.world.events.itemReleaseCharge;
    static itemStartCharge = server.world.events.itemStartCharge;
    static itemStartUseOn = server.world.events.itemStartUseOn;
    static itemStopCharge = server.world.events.itemStopCharge;
    static itemStopUseOn = server.world.events.itemStopUseOn;
    static itemUse = server.world.events.itemUse;
    static itemUseOn = server.world.events.itemUseOn;
    static leverActivate = server.world.events.leverActivate;
    static messageReceive = server.world.events.messageReceive;
    static pistonActivate = server.world.events.pistonActivate;
    static playerJoin = server.world.events.playerJoin;
    static playerLeave = server.world.events.playerLeave;
    static playerSpawn = server.world.events.playerSpawn;
    static projectileHit = server.world.events.projectileHit;
    static tick = server.world.events.tick;
    static weatherChange = server.world.events.weatherChange;
    static worldInitialize = server.world.events.worldInitialize;
}

export { EventSignalConstructor as EventSignal, MinecraftEventTypes };
export { BeforePlayerSelectedSlotEvent, BeforePlayerSelectedSlotEventSignal };
export { BeforePlayerSleepEvent, BeforePlayerSleepEventSignal };
