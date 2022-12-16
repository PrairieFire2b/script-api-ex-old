interface EventSignal<T> {
    subscribe(callback: (arg: T) => void): (arg: T) => void;
    unsubscribe(callback: (arg: T) => void): void;
}

export { EventSignal };
