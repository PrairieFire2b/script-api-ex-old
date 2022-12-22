import * as server from "@minecraft/server"

Object.defineProperty(server.MinecraftDimensionTypes, "nether", {
    value: server.world.getDimension("minecraft:nether")
});

Object.defineProperty(server.MinecraftDimensionTypes, "overworld", {
    value: server.world.getDimension("minecraft:overworld")
});

Object.defineProperty(server.MinecraftDimensionTypes, "theEnd", {
    value: server.world.getDimension("minecraft:the_end")
});
