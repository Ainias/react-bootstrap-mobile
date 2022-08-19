import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Listener } from '../Hooks/useListener';
declare type OnClickListener<Data> = Listener<'onClick', Data>;
export declare type ClickableProps<OnClickData, HrefType extends string | undefined> = RbmComponentProps<{
    interactable?: boolean;
    style?: React.CSSProperties;
    href?: HrefType;
} & OnClickListener<OnClickData>>;
declare const ClickableMemo: import("../../helper/withForwardRef").RefComponent<ClickableProps<unknown, string | undefined>, HTMLAnchorElement | HTMLSpanElement>;
export { ClickableMemo as Clickable };
