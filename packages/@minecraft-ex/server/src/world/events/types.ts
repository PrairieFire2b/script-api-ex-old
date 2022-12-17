import { EventSignal } from "./../../events/types";

interface Events {
    [eventName: string]: EventSignal<any> | undefined;
}

export { Events };
