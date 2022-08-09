/// <reference types="react" />
import { InputProps } from './Input';
export declare type HiddenInputProps<OnChangeType> = InputProps<OnChangeType> & {
    noFocusHint?: boolean;
};
declare function HiddenInput<OnChangeData>({ noFocusHint, className, ...props }: HiddenInputProps<OnChangeData>): JSX.Element;
declare const tmp: typeof HiddenInput;
export { tmp as HiddenInput };
