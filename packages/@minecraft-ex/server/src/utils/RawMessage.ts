interface RawMessage {
    rawtext?: (RawMessage | string)[];
    selector?: string;
    text?: string;
    translate?: string;
    with?: (RawMessage | string)[];
}

class RawMessage implements RawMessage {
    constructor(text: string) {
        this.rawtext = [];
        this.text = text;
        // TODO
    }
    toLocaleString() { return this.text; }
    toString() { return this.text; }
}

export { RawMessage };
