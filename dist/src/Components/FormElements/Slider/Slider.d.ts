import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { InputHTMLAttributes } from 'react';
import { Override } from '../../../TypeHelpers';
import { OptionalListener } from '../../Hooks/useListener';
export type SliderProps<OnChangeData, OnChangeValueData, OnChangeDoneData> = RbmComponentProps<Override<Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, {
    value?: number;
} & OptionalListener<'onChange', OnChangeData> & OptionalListener<'onChangeValue', OnChangeValueData, number> & OptionalListener<'onChangeDone', OnChangeDoneData>>>;
export declare const Slider: <OnChangeData, OnChangeValueData, OnChangeDoneData>({ className, style, ...props }: SliderProps<OnChangeData, OnChangeValueData, OnChangeDoneData>) => React.JSX.Element;
