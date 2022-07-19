import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { InputHTMLAttributes, useCallback, useState } from 'react';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { prefixClass } from '../../../helper';
import { Button } from '../Button/Button';

import styles from './imageInput.scss';
import { withMemo } from '../../../helper/withMemo';
import classNames from 'classnames';

export type ImageType = { name: string; url: string };

export type ImageInputProps<OnChangeData> = RbmComponentProps<
    Override<
        InputHTMLAttributes<HTMLInputElement>,
        {
            defaultValue?: ImageType;
            value?: ImageType;
            label?: string;
            onChangeImage?: (image: ImageType, imageData: File) => void;
        } & OptionalListener<'onChange', OnChangeData>
    >
>;

function ImageInput<OnChangeData>({
    className,
    value,
    defaultValue,
    onChangeImage,
    label,
    ...otherProps
}: ImageInputProps<OnChangeData>) {
    // Variables
    const [image, setImage] = useState(defaultValue);

    // Refs

    // States

    // Selectors

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const getBase64 = useCallback((file) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }, []);
    const onChange = useCallback(
        async (e) => {
            if (e.target.files.length === 0) {
                return;
            }

            onChangeWithData(e);
            const newUrl = await getBase64(e.target.files[0]);
            const newValue = { name: e.target.files[0].name, url: newUrl };
            setImage(newValue);

            if (onChangeImage) {
                onChangeImage(newValue, e.target.files[0]);
            }
        },
        [onChangeWithData, onChangeImage, getBase64]
    );

    // Effects

    // Other

    // Render Functions

    return (
        <label className={classNames(styles.imageInput, className)}>
            {label ? <span>{label}</span> : null}
            <img
                src={(value ?? image)?.url}
                alt={(value ?? image)?.name}
                className={classNames(styles.preview, (value ?? image)?.url ? undefined : styles.empty)}
            />
            <Button>{(value ?? image)?.name ?? <i>Select Image</i>}</Button>
            <input {...otherProps} className={styles.value} onChange={onChange} type="file" />
        </label>
    );
}

// Need ImageInputMemo for autocompletion of phpstorm
const ImageInputMemo = withMemo(ImageInput, styles);
export { ImageInputMemo as ImageInput };
