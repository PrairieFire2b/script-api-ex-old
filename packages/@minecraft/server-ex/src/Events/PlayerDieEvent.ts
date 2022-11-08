import { EntityDamageCause, Player, world, MinecraftEntityTypes, EntityHealthComponent } from "@minecraft/server";
import { EventSignal, PlayerEvent } from "./types";

export class PlayerDieEvent implements PlayerEvent {
    cause?: EntityDamageCause;
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
                    event.cause = arg.cause;
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
