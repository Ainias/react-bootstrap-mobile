import * as React from 'react';
import {RbmComponentProps} from '../../../RbmComponentProps';
import {Override} from '../../../../TypeHelpers';
import {useCallback, useMemo} from 'react';
import {Listener, useListenerWithExtractedProps} from '../../../Hooks/useListener';

import styles from './fileInput.scss';
import {withMemo} from '../../../../helper/withMemo';
import {FileType} from "./FileType";
import {MultipleFileInput, MultipleFileInputProps} from "./MultipleFileInput";


export type FileInputProps<OnChangeFileData> = RbmComponentProps<
    Override<
        Omit<MultipleFileInputProps<unknown>, "onChangeFiles" | "maxFiles" | "onChangeFilesData" | "mimeTypes"|"showDeleteButton">, {
        value?: FileType,
        mimeType?: string,
        required?: boolean,
    } & Listener<'onChangeFile', OnChangeFileData, FileType | undefined>>
>;

// TODO use MultipleFileInput internal
export const FileInput = withMemo(function FileInput<OnChangeData>({
                                                                       value,
                                                                       mimeType,
                                                                       required = false,
                                                                       ...otherProps
                                                                   }: FileInputProps<OnChangeData>) {
    // Variables

    // Refs

    // States
    const mimeTypes = useMemo(() => (mimeType ? [mimeType] : undefined), [mimeType]);
    const innerValue = useMemo(() => value ? [value] : [], [value]);

    // Selectors

    // Callbacks
    const [onChangeFile, multipleFileInputProps] = useListenerWithExtractedProps<"onChangeFile", OnChangeData>("onChangeFile", otherProps);
    const onChangeFiles = useCallback((files: FileType[]) => {
        if (!required || files[0]) {
            onChangeFile(files[0]);
        }
    }, [onChangeFile, required]);

    // Effects

    // Other

    // Render Functions
    return <MultipleFileInput maxFiles={1} value={innerValue} onChangeFiles={onChangeFiles}
                              mimeTypes={mimeTypes} showDeleteButton={!required} {...multipleFileInputProps}/>;

}, styles);
