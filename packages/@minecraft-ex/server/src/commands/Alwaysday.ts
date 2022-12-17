import * as server from "@minecraft/server";
import { CommandType, target } from "./types";

class AlwaysdayCommandType implements CommandType<"alwaysday", 1, [[boolean?]]> {
    id: "alwaysday" = "alwaysday";
    permissionLevel: 1 = 1;
    run(executor: target, ...data: [(boolean | undefined)?] | [never]): Promise<server.CommandResult> {
        if(executor instanceof server.Dimension || executor instanceof server.Entity) {
            return executor.runCommandAsync(`alwaysday ${data.join(" ")}`);
        } else {
            return server.world.getDimension("overworld").
                runCommandAsync(`execute run alwaysday ${JSON.stringify(executor)} ${data.join(" ")}`);
        }
    }
}

export { AlwaysdayCommandType };
