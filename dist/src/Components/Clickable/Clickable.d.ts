import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Listener } from '../Hooks/useListener';
declare type OnClickListener<Data> = Listener<'onClick', Data>;
export declare type ClickableProps<OnClickData> = RbmComponentProps<{
    interactable?: boolean;
    style?: React.CSSProperties;
} & OnClickListener<OnClickData>>;
declare function Clickable<OnClickData>({ className, children, interactable, style, ...clickData }: ClickableProps<OnClickData>): JSX.Element;
declare const ClickableMemo: typeof Clickable;
export { ClickableMemo as Clickable };
