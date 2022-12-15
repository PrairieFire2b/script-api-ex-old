interface EventSignal<T> {
    call?: (arg: T) => void;
    filter?: (predicate: { [P in keyof T]?: T[P][]; } | ((arg: T) => boolean)) => EventSignal<T>;
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
}

export { EventSignal };
