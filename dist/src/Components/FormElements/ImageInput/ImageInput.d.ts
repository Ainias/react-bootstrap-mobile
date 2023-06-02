import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { InputHTMLAttributes } from 'react';
import { OptionalListener } from '../../Hooks/useListener';
export type ImageType = {
    name: string;
    url: string;
};
export type ImageInputProps<OnChangeData> = RbmComponentProps<Override<InputHTMLAttributes<HTMLInputElement>, {
    defaultValue?: ImageType;
    value?: ImageType;
    label?: string;
    onChangeImage?: (image: ImageType, imageData: File) => void;
} & OptionalListener<'onChange', OnChangeData>>>;
declare function ImageInput<OnChangeData>({ className, style, value, defaultValue, onChangeImage, label, ...otherProps }: ImageInputProps<OnChangeData>): React.JSX.Element;
declare const ImageInputMemo: typeof ImageInput;
export { ImageInputMemo as ImageInput };