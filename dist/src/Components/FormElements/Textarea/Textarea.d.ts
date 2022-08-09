import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { TextareaHTMLAttributes } from 'react';
import { OptionalListener } from '../../Hooks/useListener';
export declare type TextareaProps<OnChangeData> = RbmComponentProps<Override<TextareaHTMLAttributes<HTMLTextAreaElement>, {
    label?: string;
    onChangeText?: (newText: string) => void;
    onEnter?: (newText: string) => void;
} & OptionalListener<'onChange', OnChangeData>>>;
declare function Textarea<OnChangeData>({ label, className, onKeyPress, onChangeText, onEnter, ...otherProps }: TextareaProps<OnChangeData>): JSX.Element;
declare const TextareaMemo: typeof Textarea;
export { TextareaMemo as Textarea };
