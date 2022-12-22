import * as server from "@minecraft/server"

const Block = Object.assign(server.Block, {});

Object.assign(server.Block.prototype, {
    toJSON() {
        let that = this as unknown as server.Block;
        let json: any = {
            "format_version": 2,
            "minecraft:block": {
                "description": {
                    "identifier": that.typeId
                },
                "components": {}
            }
        };
        let properties = that.permutation.getAllProperties();
        if(properties) {
            json["minecraft:block"]["description"]["properties"] = {};
            for(let property of properties) {
                json["minecraft:block"]["description"]["properties"][property.name] = {
                    // @ts-ignore
                    validValues: property.validValues
                };
            }
        }
        let component;
        return json;
    },
    toLocaleString() {
        return `tile.${(this as unknown as server.Block).typeId}.name`;
    }
})

export { Block };
