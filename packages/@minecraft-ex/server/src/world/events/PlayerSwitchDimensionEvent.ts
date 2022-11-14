import { Dimension, Player, world } from "@minecraft/server";
import { PlayerEvent, EventSignal } from "./types";

export class PlayerSwitchDimensionEvent implements PlayerEvent {
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
