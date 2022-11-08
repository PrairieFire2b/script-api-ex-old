import { EventSignal, BeforeFlintIgniteEventSignal, BeforePlayerSleepEventSignal, EntityDieEventSignal, FishingHookThrowEventSignal, PlayerDieEventSignal } from "./Events";

export class Events {
    [eventName: string]: EventSignal | Function;
    beforeFlintIgnite = new BeforeFlintIgniteEventSignal;
    beforePlayerSleep = new BeforePlayerSleepEventSignal;
    entityDie = new EntityDieEventSignal;
    fishingHookThrow = new FishingHookThrowEventSignal;
    playerDie = new PlayerDieEventSignal;
    registerEventSignal<T extends EventSignal>(eventName: string, eventSignal: T) {
        if(!(eventName in this))
            this[eventName] = eventSignal;
    }
}

export class World {
    events = new Events;
}
