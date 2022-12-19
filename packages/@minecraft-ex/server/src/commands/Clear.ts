import * as server from "@minecraft/server"
import { CommandType, int, target } from "./types"

class ClearCommandType implements CommandType<"clear", 1, [[target?, server.ItemType?, int?, int?]]> {
    id: "clear" = "clear";
    permissionLevel: 1 = 1;
    run(executor: target, ...data: [target?, server.ItemType?, number?, number?]): Promise<server.CommandResult> {
        data[1] = data[1]?.id as unknown as server.ItemType;
        if(executor instanceof server.Dimension || executor instanceof server.Entity) {
            return executor.runCommandAsync(`clear ${data.join(" ")}`);
        } else {
            return server.world.getDimension("overworld").
                runCommandAsync(`execute run clear ${JSON.stringify(executor)} ${data.join(" ")}`);
        }
    }
}

export { ClearCommandType };
