import * as server from "@minecraft/server"

const Container = Object.assign(server.Container, {
    from<T extends server.Block | server.Entity | server.Player>(container: T):
        T extends server.Block ? server.BlockInventoryComponentContainer | void : 
        T  extends server.Player ?  server.PlayerInventoryComponentContainer :
        server.InventoryComponentContainer {
        if(container instanceof server.Block) return container.getComponent("minecraft:inventory")?.container;
        // @ts-ignore
        return container.getComponent("minecraft:inventory")?.container;
    }
});

export { Container };
