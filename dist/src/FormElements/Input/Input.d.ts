import { ChangeEvent, InputHTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { RbmListener } from '../EventTypes';
import { Override } from '../../TypeHelpers';
export declare type InputProps<OnChangeData> = RbmComponentProps<Override<InputHTMLAttributes<HTMLInputElement>, {
    label?: string;
    onChange?: RbmListener<ChangeEvent<HTMLInputElement>, OnChangeData>;
    onChangeData?: OnChangeData;
}>>;
declare function Input<OnChangeData>({ label, className, onChangeData, onChange: outsideOnChange, ...rbmProps }: InputProps<OnChangeData>): JSX.Element;
declare const tmp: typeof Input;
export { tmp as Input };
