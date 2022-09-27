/// <reference types="react" />
import { OptionalListener } from '../../Hooks/useListener';
export declare type ColorInputProps<OnChangeData> = {
    defaultValue?: string;
    value?: string;
    label?: string;
    onChangeColor?: (newColor: string) => void;
    onOpen?: (currentColor: string) => void;
    onClose?: (newColor: string) => void;
    disableAlpha?: boolean;
} & OptionalListener<'onChange', OnChangeData>;
declare function ColorInput<OnChangeData>({ defaultValue, value, label, onChangeColor, onOpen, onClose, disableAlpha, ...otherProps }: ColorInputProps<OnChangeData>): JSX.Element;
declare const ColorInputMemo: typeof ColorInput;
export { ColorInputMemo as ColorInput };
