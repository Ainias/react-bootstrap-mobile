import * as React from 'react';
import { OptionalListener } from '../../Hooks/useListener';
export type ColorInputProps<OnChangeData> = {
    defaultValue?: string;
    value?: string;
    label?: string;
    onChangeColor?: (newColor: string) => void;
    onOpen?: (currentColor: string) => void;
    onChangeColorComplete?: (newColor: string) => void;
    onClose?: (newColor: string) => void;
    disableAlpha?: boolean;
    presetColors?: string[];
    sharedColorKey?: string;
} & OptionalListener<'onChange', OnChangeData>;
declare function ColorInput<OnChangeData>({ defaultValue, value, label, onChangeColor, onChangeColorComplete, onOpen, onClose, disableAlpha, presetColors, sharedColorKey, ...otherProps }: ColorInputProps<OnChangeData>): React.JSX.Element;
declare const ColorInputMemo: typeof ColorInput;
export { ColorInputMemo as ColorInput };
