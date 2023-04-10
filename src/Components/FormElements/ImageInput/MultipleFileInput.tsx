import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { ChangeEventHandler, DragEvent, DragEventHandler, InputHTMLAttributes, useCallback, useRef } from 'react';
import { Listener, useListenerWithExtractedProps } from '../../Hooks/useListener';

import styles from './imageInput.scss';
import { withMemo } from '../../../helper/withMemo';
import classNames from 'classnames';
import { Block } from '../../Layout/Block';
import { Text } from '../../Text/Text';
import { Flex } from '../../Layout/Flex';
import { Grow } from '../../Layout/Grow';
import { Icon } from '../../Icon/Icon';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Image } from '../../Image/Image';
import { Clickable } from '../../Clickable/Clickable';
import { Inline } from '../../Layout/Inline';

export type FileType = { name: string; url: string; mimeType: string; uploaded?: boolean; blob?: Blob };

export type MultipleImageInputProps<OnChangeFilesData> = RbmComponentProps<
    Override<
        Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange'>,
        {
            value: FileType[];
            label?: string;
            mimeTypes?: string[];
            maxFiles?: number;
            maxSizePerFile?: number;
            onError?: (error: string) => void;
        } & Listener<'onChangeFiles', OnChangeFilesData, FileType[]>
    >
>;

export const MultipleFileInput = withMemo(function MultipleImageInput<OnChangeData>({
    className,
    style,
    value,
    label,
    mimeTypes = ['image/*'],
    maxFiles = 1,
    maxSizePerFile = 1024 * 1024 * 10,
    onError,
    ...otherProps
}: MultipleImageInputProps<OnChangeData>) {
    // Variables

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);

    // States

    // Selectors

    // Callbacks
    const checkMimeType = useCallback(
        (fileType: string) => {
            return mimeTypes.some((type) => {
                if (type === '*/*' || type === '*') {
                    return true;
                }
                if (type.endsWith('/*')) {
                    return fileType.startsWith(type.substring(0, type.length - 2));
                }
                return fileType === type;
            });
        },
        [mimeTypes]
    );

    const [onChangeFiles, ...props] = useListenerWithExtractedProps('onChangeFiles', otherProps);
    const getBase64 = useCallback((inputFiles: Blob[]) => {
        const promises = inputFiles.map(
            (file) =>
                new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        resolve(reader.result as string);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                })
        );
        return Promise.all(promises);
    }, []);

    const onNewFiles = useCallback(
        async (newFiles: File[]) => {
            if (newFiles.length + value.length > maxFiles) {
                onError?.(`Es sind nur ${maxFiles} Dateien erlaubt.`);
                return;
            }

            if (newFiles.some((file) => file.size > maxSizePerFile)) {
                onError?.(`Eine Datei ist zu groß. Jede Datei darf nur ${maxSizePerFile / 1024 / 1024}MB groß sein.`);
                return;
            }

            if (newFiles.some((file) => !checkMimeType(file.type))) {
                onError?.('Eine Datei ist im falschen Format');
                return;
            }

            const newUrls = await getBase64(newFiles);
            const newValue = newFiles.map((file, index) => ({
                name: file.name,
                url: newUrls[index],
                mimeType: file.type,
                blob: file,
            }));

            onChangeFiles([...value, ...newValue]);
        },
        [checkMimeType, getBase64, maxFiles, maxSizePerFile, onChangeFiles, onError, value]
    );

    const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        async (e) => {
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            const newFiles = Array.from(e.target.files);
            await onNewFiles(newFiles);
        },
        [onNewFiles]
    );

    const removeFile = useCallback(
        (_: any, index: number) => {
            if (index >= 0 && index < value.length) {
                const newData = [...value];
                newData.splice(index, 1);
                onChangeFiles(newData);
            }
        },
        [onChangeFiles, value]
    );

    const onDrop = useCallback<DragEventHandler>(
        async (event) => {
            event.preventDefault();

            const files: File[] = [];
            if (event.dataTransfer.items) {
                for (let i = 0; i < event.dataTransfer.items.length; i++) {
                    if (event.dataTransfer.items[i].kind === 'file') {
                        const file = event.dataTransfer.items[i].getAsFile();
                        if (file) {
                            files.push(file);
                        }
                    }
                }
            } else {
                for (let i = 0; i < event.dataTransfer.files.length; i++) {
                    files.push(event.dataTransfer.files[i]);
                }
            }

            await onNewFiles(files);
        },
        [onNewFiles]
    );

    const onDragOver = useCallback((e: DragEvent) => e.preventDefault(), []);

    // Effects

    // Other

    // Render Functions
    const renderFile = (file: FileType) => {
        if (file.mimeType.startsWith('image/')) {
            return (
                <Image
                    key={file.url}
                    src={file.url}
                    alt={file.name}
                    className={classNames(styles.previewImage, file.url)}
                />
            );
        }
        // TODO style
        return (
            <Block>
                <Text>{file.name}</Text>
            </Block>
        );
    };

    return (
        <label
            className={classNames(styles.fileInput, className)}
            style={style}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <Flex horizontal={true}>
                {!!label && (
                    <Grow>
                        <Text>{label}</Text>
                    </Grow>
                )}
                {maxFiles > 1 && (
                    <Inline>
                        <Text>
                            {value.length}/{maxFiles}
                        </Text>
                    </Inline>
                )}
            </Flex>
            <Flex horizontal={true} className={styles.previewContainer}>
                {value?.map((file, index) => (
                    <Grow className={styles.preview} center={true} key={file.url}>
                        {renderFile(file)}
                        <Clickable className={styles.previewRemove} onClick={removeFile} onClickData={index}>
                            <Icon icon={faTimesCircle} />
                        </Clickable>
                    </Grow>
                ))}
                {value.length < maxFiles && (
                    <Grow className={styles.addFile} center={true} __allowChildren="html">
                        <Icon icon={faPlus} />
                        <input
                            {...props}
                            ref={inputRef}
                            className={styles.value}
                            onChange={onInputChange}
                            type="file"
                            multiple={maxFiles > 1}
                            accept={mimeTypes.join(', ')}
                        />
                    </Grow>
                )}
            </Flex>
        </label>
    );
},
styles);
