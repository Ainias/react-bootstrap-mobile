export declare type ListenerWithData<DataType, Event = void | any, ReturnType = void> = (eventData: Event, extraData: DataType) => ReturnType;
export declare type ListenerWithoutData<Event = void | any, ReturnType = void> = (eventData: Event) => ReturnType;
export declare type Listener<ListenerProperty extends string, DataType, Event = any | void, ReturnType = void> = ({
    [Property in ListenerProperty]: ListenerWithData<DataType, Event, ReturnType>;
} & {
    [Property in `${ListenerProperty}Data`]: DataType;
}) | {
    [Property in ListenerProperty]: ListenerWithoutData<Event, ReturnType>;
};
export declare type OptionalListener<ListenerProperty extends string, DataType, Event = any | void, ReturnType = void> = ({
    [Property in ListenerProperty]: ListenerWithData<DataType, Event, ReturnType>;
} & {
    [Property in `${ListenerProperty}Data`]: DataType;
}) | {
    [Property in ListenerProperty]?: ListenerWithoutData<Event, ReturnType>;
};
export declare function useListener<ListenerName extends string, DataType, EventType = any, ReturnType = void>(listener: ListenerName, listenerProps: OptionalListener<ListenerName, DataType, EventType, ReturnType>): (e: EventType) => ReturnType;
export declare function useListenerWithExtractedProps<ListenerName extends string, DataType, EventType = any, ReturnType = void, PropTypes extends OptionalListener<ListenerName, DataType, EventType, ReturnType> = OptionalListener<ListenerName, DataType, EventType, ReturnType>>(listener: ListenerName, listenerProps: PropTypes): readonly [(e: EventType) => ReturnType, Omit<PropTypes, keyof PropTypes>];
