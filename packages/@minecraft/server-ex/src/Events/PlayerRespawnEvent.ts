import { EntityHealthComponent, Location, MinecraftEntityTypes, Player, world } from "@minecraft/server";
import { EventSignal, PlayerEvent } from "./types";

export class PlayerRespawnEvent implements PlayerEvent {
    from?: Location;
    player?: Player;
    to?: Location;
}

export class PlayerRespawnEventSignal implements EventSignal<PlayerRespawnEvent> {
    #callbacks: ((arg: PlayerRespawnEvent) => void)[] = [];
    constructor() {
        let component;
        let event: PlayerRespawnEvent;
        let players = Array.from(world.getPlayers());
        world.events.entityHurt.subscribe((arg) => {
            component = arg.hurtEntity.getComponent("minecraft:health");
            if (arg.hurtEntity.typeId === MinecraftEntityTypes.player.id
                && component instanceof EntityHealthComponent) {
                if (component.current <= 0) {
                    event = new PlayerRespawnEvent;
                    event.from = new Location(arg.hurtEntity.location.x, arg.hurtEntity.location.y, arg.hurtEntity.location.z);
                    let player = Array.from(world.getPlayers({ name: arg.hurtEntity.nameTag }))[0];
                    event.player = player;
                    let func = () => {
                        if(players.includes(player) && event?.from?.equals(player.location) == false) {
                            event.to = player.location;
                            this.#callbacks.forEach(callback => callback(event));
                            world.events.tick.unsubscribe(func);
                        }
                    };
                    world.events.tick.subscribe(func);
                }
            }
        });
        world.events.playerJoin.subscribe(arg => {
            players.push(arg.player);
        });
        world.events.playerLeave.subscribe(arg => {
            for (let player of players)
                if (player.name === arg.playerName)
                    delete players[players.indexOf(player)];
        });
    }
    subscribe(callback: (arg: PlayerRespawnEvent) => void): (arg: PlayerRespawnEvent) => void {
        this.#callbacks.push(callback);
        return callback;
    }
    unsubscribe(callback: (arg: PlayerRespawnEvent) => void): void {
        this.#callbacks.includes(callback) && delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
    
}
