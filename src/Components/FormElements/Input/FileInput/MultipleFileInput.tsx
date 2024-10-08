import * as React from 'react';
import {RbmComponentProps} from '../../../RbmComponentProps';
import {Override} from '../../../../TypeHelpers';
import {ChangeEventHandler, DragEvent, InputHTMLAttributes, useCallback, useRef} from 'react';
import {Listener, useListenerWithExtractedProps} from '../../../Hooks/useListener';
import styles from './fileInput.scss';
import {withMemo} from '../../../../helper/withMemo';
import classNames from 'classnames';
import {Block} from '../../../Layout/Block';
import {Text} from '../../../Text/Text';
import {Flex} from '../../../Layout/Flex';
import {Grow} from '../../../Layout/Grow';
import {Icon} from '../../../Icon/Icon';
import {faFile, faPlus, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {Image} from '../../../Image/Image';
import {Clickable} from '../../../Clickable/Clickable';
import {Inline} from '../../../Layout/Inline';
import {FileType} from "./FileType";
import { InlineBlock } from "../../../Layout/InlineBlock";


export type MultipleFileInputProps<OnChangeFilesData> = RbmComponentProps<
    Override<
        Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'value'>,
        {
            value: FileType[];
            label?: string;
            mimeTypes?: string[];
            maxFiles?: number;
            maxSizePerFile?: number;
            onError?: (error: string) => void;
            allowOverride?: boolean
            showDeleteButton?: boolean
            error?: string,
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
                                                                                        allowOverride = maxFiles === 1,
                                                                                        onError,
                                                                                        showDeleteButton = true,
    error,
                                                                                        ...otherProps
                                                                                    }: MultipleFileInputProps<OnChangeData>) {
        // Variables

        // Refs
        const inputRef = useRef<HTMLInputElement>(null);
        const indexRef = useRef<number | undefined>(undefined);

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
            async (newFiles: File[], index?: number) => {
                if (newFiles.some((file) => !checkMimeType(file.type))) {
                    onError?.('Eine Datei ist im falschen Format');
                    return;
                }

                if (newFiles.length + value.length > maxFiles && (!allowOverride || index === undefined || index + newFiles.length > maxFiles)) {
                    onError?.(`Es sind nur ${maxFiles} Dateien erlaubt.`);
                    return;
                }

                if (maxSizePerFile && newFiles.some((file) => file.size > maxSizePerFile)) {
                    onError?.(`Eine Datei ist zu groß. Jede Datei darf nur ${maxSizePerFile / 1024 / 1024}MB groß sein.`);
                    return;
                }

                const newUrls = await getBase64(newFiles);
                const newValue = newFiles.map((file, fileIndex) => ({
                    name: file.name,
                    data: newUrls[fileIndex],
                    mimeType: file.type,
                    blob: file,
                }));

                if (newFiles.length + value.length > maxFiles && index !== undefined) {
                    const onChangeFilesValue = [...value];
                    onChangeFilesValue.splice(index, newFiles.length, ...newValue);
                    onChangeFiles(onChangeFilesValue);
                } else {
                    onChangeFiles([...value, ...newValue]);
                }
            },
            [allowOverride, checkMimeType, getBase64, maxFiles, maxSizePerFile, onChangeFiles, onError, value]
        );

        const onInputChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
            async (e) => {
                const index = indexRef.current;
                indexRef.current = undefined;

                if (!e.target.files || e.target.files.length === 0) {
                    return;
                }

                const newFiles = Array.from(e.target.files);
                await onNewFiles(newFiles, index);
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

        const onDrop = useCallback(
            async (event: DragEvent, index: number) => {
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

                await onNewFiles(files, index);
            },
            [onNewFiles]
        );

        const onDragOver = useCallback((e: DragEvent) => e.preventDefault(), []);

        const clickOnFile = useCallback((_: any, index?: number) => {
            if ((index !== undefined && !allowOverride) || !inputRef.current) {
                return;
            }

            indexRef.current = index;
            inputRef.current.dispatchEvent(new MouseEvent("click"));
        }, [allowOverride]);

        // Effects

        // Other

        // Render Functions
        const renderFile = (file: FileType) => {
            if (file.mimeType.startsWith('image/')) {
                return (
                    <Image
                        key={file.data}
                        src={file.data}
                        alt={file.name}
                        className={classNames(styles.previewImage, file.data)}
                    />
                );
            }
            // TODO style
            return (
                <Block className={styles.previewText}>
                    <Icon icon={faFile} className={styles.previewTextIcon}/><Text>{file.name}</Text>
                </Block>
            );
        };

        return (
            <span
                className={classNames(styles.fileInput, className)}
                style={style}
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
                    {value?.map((file, index) => {
                        return <Grow className={styles.preview} center={true} key={file.data}>
                            <Clickable
                                onDrop={onDrop}
                                onDragOver={onDragOver}
                                onDropData={index}

                                onClick={clickOnFile}
                                onClickData={index}
                            >
                                {renderFile(file)}
                                {showDeleteButton &&
                                    <Clickable className={styles.previewRemove} onClick={removeFile} onClickData={index}>
                                        <Icon icon={faTimesCircle}/>
                                    </Clickable>}
                            </Clickable>
                        </Grow>;
                    })}
                    <Grow className={classNames(styles.addFile, {[styles.hidden]: value.length >= maxFiles})} center={true}>
                        <Clickable
                            className={styles.addFileButton}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            onDropData={maxFiles}
                            onClick={clickOnFile}
                            __allowChildren="html"
                        >
                            <Icon icon={faPlus}/>
                            <input
                                {...props}
                                ref={inputRef}
                                className={styles.value}
                                onChange={onInputChange}
                                value=''
                                type="file"
                                multiple={maxFiles > 1}
                                accept={mimeTypes.join(', ')}
                            />
                        </Clickable>
                    </Grow>
                </Flex>
                {error && <InlineBlock className={styles.error}><Text>{error}</Text></InlineBlock>}
            </span>
        );
    },
    styles);
