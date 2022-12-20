import * as server from "@minecraft/server"

class BeforePlayerSleepEvent {
    blockLocation!: server.BlockLocation;
    cancel = false;
    player!: server.Player;
}

class BeforePlayerSleepEventSignal {
    #callbacks: ((arg: BeforePlayerSleepEvent) => void)[] = [];
    constructor() {
        let event: BeforePlayerSleepEvent;
        server.world.events.beforeItemUseOn.subscribe(async arg => {
            let block = arg.source.dimension.getBlock(arg.blockLocation);
            if(!arg.source.isSneaking
                && block?.typeId === server.MinecraftBlockTypes.bed.id
                && block?.dimension.id === "minecraft:overworld"
                && server.world.getTime() >= 13000 && server.world.getTime() <= 23457
                && (await arg.source.dimension.runCommandAsync(`testfor @e[c=15,x=${block.x},y=${block.y},z=${block.z},family=monster]`)).successCount == 0) {
                event = new BeforePlayerSleepEvent;
                event.blockLocation = arg.blockLocation;
                event.player = Array.from(server.world.getPlayers({name: arg.source.nameTag}))[0];
                this.#callbacks.forEach(callback => callback(event));
                arg.cancel = event.cancel;
            }
        });
    }
    subscribe(callback: (arg: BeforePlayerSleepEvent) => void) {
        return this.#callbacks[this.#callbacks.length] = callback;
    }
    unsubscribe(callback: (arg: BeforePlayerSleepEvent) => void) {
        delete this.#callbacks[this.#callbacks.indexOf(callback)];
    }
}

// @ts-ignore
let beforePlayerSleepEventSignal: BeforePlayerSleepEventSignal = new BeforePlayerSleepEventSignal();

export { BeforePlayerSleepEvent, BeforePlayerSleepEventSignal, beforePlayerSleepEventSignal };
