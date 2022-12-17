export * from "./commands/index"
export * from "./events/index"
export * from "./world/index"
import { World } from "./world/index";

const world = new World();

export { world };
