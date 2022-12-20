import * as server from "@minecraft/server"

class Dimension extends server.Dimension {
    // @ts-ignore
    constructor(dimensionId: string) {
        return server.world.getDimension(dimensionId);
    }
}

Object.assign(server.Dimension.prototype, {
    getAllPlayers(): server.Player[] {
        return Array.from((this as unknown as server.Dimension).getPlayers());
    }
});

export { Dimension };
