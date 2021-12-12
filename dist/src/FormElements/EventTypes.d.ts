export declare type RbmEvent<BaseEvent, DataType> = BaseEvent & {
    extraData?: DataType;
};
export declare type Listener<Event> = (event: Event) => void;
export declare type RbmListener<BaseEvent, DataType> = Listener<RbmEvent<BaseEvent, DataType>>;
