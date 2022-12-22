import * as server from "@minecraft/server"

enum BlockPlaceMode {
    destroy = "destroy",
    keep = "keep",
    replace = "replace"
}

class Dimension extends server.Dimension {
    static [Symbol.hasInstance](instance: any) {
        return instance instanceof server.Dimension;
    }
    // @ts-ignore
    constructor(dimensionId: string) {
        return server.world.getDimension(dimensionId);
    }
}

Object.assign(server.Dimension.prototype, {
    getAllPlayers(): server.Player[] {
        return Array.from((this as unknown as server.Dimension).getPlayers());
    },
    setBlock(identifier: string, blockLocation: server.BlockLocation, mode: BlockPlaceMode): server.Block {
        let that = this as unknown as Dimension;
        let block = that.getBlock(blockLocation);
        if(!block) that
            .runCommandAsync(`setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${identifier} [] ${mode}`)
            .then().catch((error) => { throw error; });
        else if(mode == "replace") block.setType(server.MinecraftBlockTypes.get(identifier));
        else that
            .runCommandAsync(`setblock ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${identifier} [] ${mode}`)
            .then().catch((error) => { throw error; });
        return block;
    }
});

export { Dimension };
