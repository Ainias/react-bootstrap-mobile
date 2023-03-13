import { RbmComponentProps } from '../RbmComponentProps';
import { OptionalListener } from '../Hooks/useListener';
type OnClickListener<Data> = OptionalListener<'onClick', Data>;
type OnMouseDownListener<Data> = OptionalListener<'onMouseDown', Data>;
type OnMouseUpListener<Data> = OptionalListener<'onMouseUp', Data>;
type OnMouseMoveListener<Data> = OptionalListener<'onMouseMove', Data>;
export type ClickableProps<OnClickData, OnMouseDownData, OnMouseMoveData, OnMouseUpData, OnClickCaptureData, HrefType extends string | undefined> = RbmComponentProps<{
    interactable?: boolean;
    href?: HrefType;
    preventDefault?: boolean;
    stopPropagation?: boolean;
} & OnClickListener<OnClickData> & OnMouseDownListener<OnMouseDownData> & OnMouseMoveListener<OnMouseMoveData> & OnMouseUpListener<OnMouseUpData> & OptionalListener<'onClickCapture', OnClickCaptureData>>;
declare const ClickableMemo: import("../../helper/withForwardRef").RefComponent<ClickableProps<unknown, unknown, unknown, unknown, unknown, string | undefined>, HTMLAnchorElement | HTMLSpanElement>;
export { ClickableMemo as Clickable };
