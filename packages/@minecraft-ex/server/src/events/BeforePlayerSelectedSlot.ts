import { EventSignal } from "./types";
import * as server from "@minecraft/server"

class BeforePlayerSelectedSlotEvent {
    cancel = false;
    currentSelectedSlot!: number;
    player!: server.Player;
    selectedSlot!: number;
}

class BeforePlayerSelectedSlotEventSignal implements EventSignal<BeforePlayerSelectedSlotEvent> {
    #callbacks: ((arg: BeforePlayerSelectedSlotEvent) => void)[] = [];
    constructor() {
        let event: BeforePlayerSelectedSlotEvent;
        let map: { [playerName: string]: number } = {};
        server.world.getAllPlayers().forEach(player => map[player.name] = player.selectedSlot);
        server.world.events.playerJoin.subscribe(arg => map[arg.playerName] = Array.from(server.world.getPlayers({name: arg.playerName}))[0].selectedSlot);
        server.world.events.playerLeave.subscribe(arg => delete map[arg.playerName]);
        server.world.events.tick.subscribe(() => {
            for(let player of server.world.getAllPlayers()) {
                if(map[player.name] != player.selectedSlot) {
                    event = new BeforePlayerSelectedSlotEvent;
                    event.currentSelectedSlot = player.selectedSlot;
                    event.selectedSlot = map[player.name];
                    this.#callbacks.forEach(callback => callback(event));
                    if(event.cancel) player.selectedSlot = event.currentSelectedSlot;
                    else map[player.name] = player.selectedSlot;
                }
            }
        });
    }
    subscribe(callback: (arg: BeforePlayerSelectedSlotEvent) => void): (arg: BeforePlayerSelectedSlotEvent) => void {
        return this.#callbacks[this.#callbacks.length] = callback;
    }
    unsubscribe(callback: (arg: BeforePlayerSelectedSlotEvent) => void): void {
        delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}

export { BeforePlayerSelectedSlotEvent, BeforePlayerSelectedSlotEventSignal };
