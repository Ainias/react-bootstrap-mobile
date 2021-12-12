export type RbmEvent<BaseEvent, DataType> = BaseEvent & { extraData?: DataType };

export type Listener<Event> = (event: Event) => void;
export type RbmListener<BaseEvent, DataType> = Listener<RbmEvent<BaseEvent, DataType>>;
