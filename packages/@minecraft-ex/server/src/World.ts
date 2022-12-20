import * as server from "@minecraft/server"

class World extends server.World {
    // @ts-ignore
    constructor() {
        return server.world;
    }
}

const world = server.world;

export { World, world };
