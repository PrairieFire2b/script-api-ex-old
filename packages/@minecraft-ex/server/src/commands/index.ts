import * as server from "@minecraft/server"
import { int } from "./types";

type TupleToUnion<T extends any[]> = T extends [infer F, ...infer rest] ? F | TupleToUnion<rest> : never[];

class CommandType<T1 extends string, T2 extends any[][]> {
    #run: (...commands: TupleToUnion<T2>) => Promise<server.CommandResult>;
    id: T1;
    runAsync(...commands: TupleToUnion<T2>): Promise<server.CommandResult> {
        // TODO
        return void 0 as unknown as Promise<server.CommandResult>;
    }
    getPermissionLevel(): number {
        // TODO
        return void 0 as unknown as number;
    }
    constructor(identifier: T1, run: (...commands: TupleToUnion<T2>) => Promise<server.CommandResult>) {
        this.id = identifier;
        this.#run = run;
    }
}

class MinecraftCommandTypes {
    weather!: CommandType<"weather", [["clear" | "rain" | "thunder", int], ["query"]]>
}

export { CommandType, MinecraftCommandTypes };
