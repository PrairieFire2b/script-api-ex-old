import * as server from "@minecraft/server"

class PlayerEnterDimensionEvent {
    dimension!: server.Dimension;
    enteringDimension!: server.Dimension;
    player!: server.Player;
}

class PlayerEnterDimensionEventSignal {
    #callbacks: ((arg: PlayerEnterDimensionEvent) => void)[] = [];
    constructor() {
        let event;
        // TODO
    }
    subscribe(callback: (arg: PlayerEnterDimensionEvent) => void) {
        return this.#callbacks[this.#callbacks.length] = callback;
    }
    unsubscribe(callback: (arg: PlayerEnterDimensionEvent) => void) {
        delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}

let playerEnterDimension = new PlayerEnterDimensionEventSignal;

// TODO
export { PlayerEnterDimensionEvent, PlayerEnterDimensionEventSignal, playerEnterDimension };
