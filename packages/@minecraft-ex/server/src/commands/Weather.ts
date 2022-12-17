import * as server from "@minecraft/server";
import { CommandType, int, target } from "./types";

class WeatherCommandType implements CommandType<"weather", 1, [["clear" | "rain" | "thunder", int?], ["query"]]> {
    id: "weather" = "weather";
    permissionLevel: 1 = 1;
    run(executor: server.Dimension | target, ...data: ["clear" | "rain" | "thunder", number?] | ["query"]): Promise<server.CommandResult> {
        if(executor instanceof server.Dimension || executor instanceof server.Entity) {
            return executor.runCommandAsync(`weather ${data.join(" ")}`);
        } else {
            return server.world.getDimension("overworld").
                runCommandAsync(`execute as weather ${JSON.stringify(executor)} ${data.join(" ")}`);
        }
    }
}

export { WeatherCommandType };
