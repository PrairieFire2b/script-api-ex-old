import * as server from "@minecraft/server"

const Block = Object.assign(server.Block, {});

Object.assign(server.Block.prototype, {
    toLocaleString() {
        return `tile.${(this as unknown as server.Block).typeId}.name`;
    }
})

export { Block };
