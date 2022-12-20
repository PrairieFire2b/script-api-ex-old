import * as server from "@minecraft/server"

const BlockLocation = Object.assign(server.BlockLocation, {
    from({x, y, z}: server.Vector3) {
        return new server.BlockLocation(x, y, z);
    }
});

export { BlockLocation };
