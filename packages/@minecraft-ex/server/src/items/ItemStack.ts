import * as server from "@minecraft/server"

const ItemStack = Object.assign(server.ItemStack, {});

type ItemStack = server.ItemStack;

Object.assign(server.ItemStack.prototype, {
    toJSON() {
        let that = this as unknown as ItemStack;
        let json: any =  {
            "format_version": 2,
            "minecraft:item": {
                "description": {
                    "identifier": `${that.typeId}`
                },
                "components": {}
            }
        }
        let component;
        if(component = that.getComponent("minecraft:cooldown")  as server.ItemCooldownComponent) {
            if(component.cooldownCategory) {
                component = {
                    category: component.cooldownCategory,
                    duration: component.cooldownTicks
                };
                json["minecraft:item"]["components"]["minecraft:food"] = component;
            }
        }
        if(component = that.getComponent("minecraft:durability") as server.ItemDurabilityComponent) {
            if(component.getDamageChance) {
                component = {
                    damage_chance: component.getDamageChance(),
                    max_durability: component.maxDurability
                };
                json["minecraft:item"]["components"]["minecraft:durability"] = component;
            }
        }
        if(component = that.getComponent("minecraft:food") as server.ItemFoodComponent) {
            if(component.canAlwaysEat) {
                component = {
                    can_always_eat: component.canAlwaysEat,
                    nutrition: component.nutrition,
                    saturation_modifier: component.saturationModifier,
                    using_converts_to: component.usingConvertsTo
                }
                json["minecraft:item"]["components"]["minecraft:food"] = component;
            }
        }
        return json;
    },
    toLocaleString() {
        return `item.${(this as unknown as ItemStack).typeId}.name`;
    }
});

export { ItemStack };
