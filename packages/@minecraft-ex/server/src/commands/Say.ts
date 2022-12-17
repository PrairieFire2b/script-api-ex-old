import * as server from "@minecraft/server"
import { CommandType, Item, int, target } from "./types"

class SayCommandType implements CommandType<"say", 0, [[string?]]> {
    id: "say" = "say";
    permissionLevel: 0 = 0;
    run(executor: target, ...data: [string?]): Promise<server.CommandResult> {
        if(executor instanceof server.Dimension || executor instanceof server.Entity) {
            return executor.runCommandAsync(`${this.id} ${data.join(" ")}`);
        } else {
            return server.world.getDimension("overworld").
                runCommandAsync(`execute run ${this.id} ${JSON.stringify(executor)} ${data.join(" ")}`);
        }
    }
}

export { SayCommandType };
