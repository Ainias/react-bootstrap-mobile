import * as React from 'react';
import { RbmComponentProps } from '../../../RbmComponentProps';
import { Override } from '../../../../TypeHelpers';
import { Listener } from '../../../Hooks/useListener';
import { FileType } from "./FileType";
import { MultipleFileInputProps } from "./MultipleFileInput";
export type FileInputProps<OnChangeFileData> = RbmComponentProps<Override<Omit<MultipleFileInputProps<unknown>, "onChangeFiles" | "maxFiles" | "onChangeFilesData" | "mimeTypes" | "showDeleteButton">, {
    value?: FileType;
    mimeType?: string;
    required?: boolean;
} & Listener<'onChangeFile', OnChangeFileData, FileType | undefined>>>;
export declare const FileInput: <OnChangeData>({ value, mimeType, required, ...otherProps }: FileInputProps<OnChangeData>) => React.JSX.Element;
