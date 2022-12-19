import * as server from "@minecraft/server"

interface Player extends server.Player {
    currentHealth: number;
}

interface PlayerConstructor {
    from(playerLike: server.Entity | string): server.Player | void;
    prototype: Player;
}

// @ts-ignore
const Player: typeof server.Player & PlayerConstructor = Object.assign(server.Player, {
    from(playerLike: server.Entity | string): server.Player | void {
        return Array.from(server.world.getPlayers({ name: typeof playerLike == "string" ? playerLike : playerLike.nameTag }))[0];
    }
});

Object.assign(server.Player.prototype, {
    get currentHealth(): number {
        // @ts-ignore
        return (this.getComponent("minecraft:health") as server.EntityHealthComponent).current;
    },
    set currentHealth(value: number) {
        // @ts-ignore
        (this.getComponent("minecraft:health") as server.EntityHealthComponent).setCurrent(value);
    },
    get selectedItem(): server.ItemStack {
        // @ts-ignore
        return (this.getComponent("minecraft:inventory") as server.EntityInventoryComponent).container.getItem(this.selectedSlot);
    }
});

export { Player };
