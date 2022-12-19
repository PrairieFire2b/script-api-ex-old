import * as server from "@minecraft/server"
import { CommandType, TitleRawSet, int, target } from "./types"
import { AlwaysdayCommandType } from "./Alwaysday";
import { WeatherCommandType } from "./Weather";
import { ClearCommandType } from "./Clear";
import { SayCommandType } from "./Say";

type TupleToUnion<T extends any[]> = T extends [infer F, ...infer rest] ? F | TupleToUnion<rest> : [never];

class CommandTypeConstructor<T1 extends string, T2 extends 0 | 1 | 2 | 3 | 4, T3 extends any[][]> implements CommandType<T1, T2, T3> {
    readonly id: T1;
    readonly permissionLevel: T2;
    run(executor: target, ...data: TupleToUnion<T3>): Promise<server.CommandResult> {
        // TODO
        return void 0 as unknown as Promise<server.CommandResult>
    }
    constructor(identifier: T1, permissionLevel: T2) {
        this.id = identifier;
        this.permissionLevel = permissionLevel;
    }
}

Object.defineProperty(CommandTypeConstructor, "name", { value: "CommandType" });

class MinecraftCommandTypes {
    static alwaysday: CommandType<"alwaysday", 1, [[boolean?]]> = new AlwaysdayCommandType;
    static clear: CommandType<"clear", 1, [[target?, server.ItemType?, int?, int?]]> = new ClearCommandType;
    static daylock: CommandType<"daylock", 1, [[boolean?]]> = new AlwaysdayCommandType as unknown as CommandType<"daylock", 1, [[boolean?]]>;
    static op: CommandType<"op", 2, [[target]]>;
    static say: CommandType<"say", 0, [[string?]]> = new SayCommandType;
    static tellraw: CommandType<"tellraw", 0, [[target, server.RawMessage]]>;
    static titleraw: CommandType<"titleraw", 1, [[target, TitleRawSet, server.RawMessage]]>;
    static weather: CommandType<"weather", 1, [["clear" | "rain" | "thunder", int?], ["query"]]> = new WeatherCommandType;
}

Object.defineProperty(MinecraftCommandTypes.daylock, "id", "daylock");

type CommandName = keyof typeof MinecraftCommandTypes;

export { CommandName, CommandTypeConstructor as CommandType, MinecraftCommandTypes };
