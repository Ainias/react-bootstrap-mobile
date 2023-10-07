import * as React from 'react';
import { RbmComponentProps } from '../../../RbmComponentProps';
import { Override } from '../../../../TypeHelpers';
import { InputHTMLAttributes } from 'react';
import { Listener } from '../../../Hooks/useListener';
import { FileType } from "./FileType";
export type MultipleFileInputProps<OnChangeFilesData> = RbmComponentProps<Override<Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'value'>, {
    value: FileType[];
    label?: string;
    mimeTypes?: string[];
    maxFiles?: number;
    maxSizePerFile?: number;
    onError?: (error: string) => void;
    allowOverride?: boolean;
    showDeleteButton?: boolean;
} & Listener<'onChangeFiles', OnChangeFilesData, FileType[]>>>;
export declare const MultipleFileInput: <OnChangeData>({ className, style, value, label, mimeTypes, maxFiles, maxSizePerFile, allowOverride, onError, showDeleteButton, ...otherProps }: MultipleFileInputProps<OnChangeData>) => React.JSX.Element;
