import { useCallback } from 'react';

type ListenerWithData<DataType, Event = void | any, ReturnType = void> = (
    eventData: Event,
    extraData: DataType
) => ReturnType;
type ListenerWithoutData<Event = void | any, ReturnType = void> = (eventData: Event) => ReturnType;

export type Listener<ListenerProperty extends string, DataType, Event = any | void, ReturnType = void> =
    | ({ [Property in ListenerProperty]: ListenerWithData<DataType, Event, ReturnType> } & {
          [Property in `${ListenerProperty}Data`]: DataType;
      })
    | {
          [Property in ListenerProperty]: ListenerWithoutData<Event, ReturnType>;
      };

export type OptionalListener<ListenerProperty extends string, DataType, Event = any | void, ReturnType = void> =
    | ({ [Property in ListenerProperty]: ListenerWithData<DataType, Event, ReturnType> } & {
          [Property in `${ListenerProperty}Data`]: DataType;
      })
    | {
          [Property in ListenerProperty]?: ListenerWithoutData<Event, ReturnType>;
      };

export function useListener<ListenerName extends string, DataType, EventType = any, ReturnType = void>(
    listener: ListenerName,
    listenerProps: OptionalListener<ListenerName, DataType, EventType, ReturnType>
) {
    const listenerDataName = `${listener}Data` as keyof typeof listenerProps;
    const listenerName = listener as keyof typeof listenerProps;

    const hasExtraData = listenerDataName in listenerProps;

    const extraData = hasExtraData ? (listenerProps[listenerDataName] as DataType) : undefined;
    const callback = listenerProps[listenerName] as
        | ListenerWithoutData<EventType, ReturnType>
        | ListenerWithData<DataType, EventType, ReturnType>
        | undefined;

    return useCallback(
        (e: EventType) => {
            let res: ReturnType | undefined;
            if (extraData !== undefined) {
                res = (callback as ListenerWithData<DataType, EventType, ReturnType>)(e, extraData);
            } else if (callback) {
                res = (callback as ListenerWithoutData<EventType, ReturnType>)(e);
            }
            return res as ReturnType;
        },
        [callback, extraData]
    );
}
