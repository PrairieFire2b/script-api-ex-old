import * as server from "@minecraft/server"

const ItemStack = Object.assign(server.ItemStack, {});

type ItemStack = server.ItemStack;

Object.assign(server.ItemStack.prototype, {
    toLocaleString() {
        return `item.${(this as unknown as ItemStack).typeId}.name`;
    }
});

export { ItemStack };
