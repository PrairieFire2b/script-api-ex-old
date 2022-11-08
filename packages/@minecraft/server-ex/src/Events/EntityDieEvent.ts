import { EntityDamageCause, Entity, world, EntityHealthComponent } from "@minecraft/server";
import { EntityEvent, EventSignal } from "./types";

export class EntityDieEvent implements EntityEvent {
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
