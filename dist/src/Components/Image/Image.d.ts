import * as React from 'react';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { CSSProperties, DOMAttributes } from 'react';
import { Override } from '../../TypeHelpers';
export type ImageProps = RbmComponentProps<Override<Omit<React.ComponentPropsWithoutRef<'img'>, keyof DOMAttributes<'img'>>, {
    src: string;
    style?: CSSProperties;
    alt?: string;
}>, WithNoChildren>;
declare function Image({ src, alt, className, style, ...otherProps }: ImageProps): JSX.Element;
declare const ImageMemo: typeof Image;
export { ImageMemo as Image };
