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
            && component instanceof EntityHealthComponent
            && component.current <= 0) {
                let deadPlayer = <Player>arg.hurtEntity;
                let eventData = new PlayerRespawnEvent;
                let fromLocation = deadPlayer.location;
                eventData.from = new Location(fromLocation.x, fromLocation.y, fromLocation.z);
                eventData.player = deadPlayer;
                let func = () => {
                    if(!players.includes(deadPlayer)){
                        world.events.tick.unsubscribe(func);
                        return;
                    }
                    let component = deadPlayer.getComponent("minecraft:health");
                    if (component instanceof EntityHealthComponent && component.current > 0) {
                        world.events.tick.unsubscribe(func);
                        let toLocation = deadPlayer.location;
                        eventData.to = new Location(toLocation.x, toLocation.y, toLocation.z);
                        this.#callbacks.forEach(callback => callback(eventData));
                    }
                };
                world.events.tick.subscribe(func);
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
