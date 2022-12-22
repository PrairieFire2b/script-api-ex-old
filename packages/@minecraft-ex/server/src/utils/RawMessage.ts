interface RawMessage {
    rawtext?: (RawMessage | string)[];
    text?: string;
    translate?: string;
    with?: string[];
}

interface CommandRawMessage extends RawMessage {
    selector?: string;
}

export type { RawMessage, CommandRawMessage };
