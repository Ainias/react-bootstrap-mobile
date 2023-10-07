import * as React from 'react';
import { OptionalListener } from '../../Hooks/useListener';
import { SelectOption } from '../Select/Select';
import { RbmComponentProps } from '../../RbmComponentProps';
export type SearchSelectInputProps<OnChangeData> = RbmComponentProps<{
    label?: string;
    options: SelectOption[];
    onChangeValue?: (newValues: string[]) => void;
    values: string[];
} & OptionalListener<'onChange', OnChangeData>>;
export declare const SearchSelectInput: <OnChangeData>({ label, options, values, onChangeValue, className, style, }: SearchSelectInputProps<OnChangeData>) => React.JSX.Element;
