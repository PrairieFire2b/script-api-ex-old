import * as server from "@minecraft/server"
import { Events } from "./events/types"

class World {
    events: Events  = {
        beforeChat: server.world.events.beforeChat,
        beforeDataDrivenEntityTriggerEvent: server.world.events.beforeDataDrivenEntityTriggerEvent,
        beforeExplosion: server.world.events.beforeExplosion,
        beforeItemDefinitionEvent: server.world.events.beforeItemDefinitionEvent,
        beforeItemUse: server.world.events.beforeItemUse,
        beforeItemUseOn: server.world.events.beforeItemUseOn,
        beforePistonActivate: server.world.events.beforePistonActivate,
        blockBreak: server.world.events.blockBreak,
        blockExplode: server.world.events.blockExplode,
        blockPlace: server.world.events.blockPlace,
        buttonPush: server.world.events.buttonPush,
        chat: server.world.events.chat,
        dataDrivenEntityTriggerEvent: server.world.events.dataDrivenEntityTriggerEvent,
        effectAdd: server.world.events.effectAdd,
        entityCreate: server.world.events.entityCreate,
        entityHit: server.world.events.entityHit,
        entityHurt: server.world.events.entityHurt,
        explosion: server.world.events.explosion,
        itemCompleteCharge: server.world.events.itemCompleteCharge,
        itemDefinitionEvent:server.world.events.itemDefinitionEvent,
        itemReleaseCharge: server.world.events.itemReleaseCharge,
        itemStartCharge: server.world.events.itemStartCharge,
        itemStartUseOn: server.world.events.itemStartUseOn,
        itemStopCharge: server.world.events.itemStopCharge,
        itemStopUseOn: server.world.events.itemStopUseOn,
        itemUse: server.world.events.itemUse,
        itemUseOn: server.world.events.itemUseOn,
        leverActivate: server.world.events.leverActivate,
        messageReceive: server.world.events.messageReceive,
        pistonActivate: server.world.events.pistonActivate,
        playerJoin: server.world.events.playerJoin,
        playerLeave: server.world.events.playerLeave,
        projectileHit: server.world.events.projectileHit,
        tick: server.world.events.tick,
        weatherChange: server.world.events.weatherChange,
        worldInitialize: server.world.events.worldInitialize,
    }
}

export { World };
