import { RbmComponentProps } from '../RbmComponentProps';
import { OptionalListener } from '../Hooks/useListener';
type OnClickListener<Data> = OptionalListener<'onClick', Data>;
type OnMouseDownListener<Data> = OptionalListener<'onMouseDown', Data>;
type OnMouseUpListener<Data> = OptionalListener<'onMouseUp', Data>;
type OnMouseMoveListener<Data> = OptionalListener<'onMouseMove', Data>;
type OnDropListener<Data> = OptionalListener<'onDrop', Data>;
type OnDragOverListener<Data> = OptionalListener<'onDragOver', Data>;
export type ClickableProps<OnClickData, OnMouseDownData, OnMouseMoveData, OnMouseUpData, OnClickCaptureData, OnDropData, OnDragOverData, OnMouseEnterData, OnMouseLeaveData, HrefType extends string | undefined> = RbmComponentProps<{
    interactable?: boolean;
    href?: HrefType;
    preventDefault?: boolean;
    stopPropagation?: boolean;
} & OnClickListener<OnClickData> & OnMouseDownListener<OnMouseDownData> & OnMouseMoveListener<OnMouseMoveData> & OnMouseUpListener<OnMouseUpData> & OnDropListener<OnDropData> & OnDragOverListener<OnDragOverData> & OptionalListener<'onClickCapture', OnClickCaptureData> & OptionalListener<'onMouseEnter', OnMouseEnterData> & OptionalListener<'onMouseLeave', OnMouseLeaveData>>;
declare const ClickableMemo: import("../../helper/withForwardRef").RefComponent<ClickableProps<unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, string | undefined>, HTMLAnchorElement | HTMLSpanElement>;
export { ClickableMemo as Clickable };
