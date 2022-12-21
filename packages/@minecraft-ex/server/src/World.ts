import * as server from "@minecraft/server"

class World extends server.World {
    [Symbol.hasInstance](instance: any) {
        return instance instanceof server.World;
    }
    // @ts-ignore
    constructor() {
        // @ts-ignore
        return server.world;
    }
}

const world = server.world;

export { World, world };
