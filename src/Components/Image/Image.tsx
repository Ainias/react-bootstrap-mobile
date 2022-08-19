import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { CSSProperties, DOMAttributes } from 'react';
import { Override } from '../../TypeHelpers';

export type ImageProps = RbmComponentProps<
    Override<
        Omit<React.ComponentPropsWithoutRef<'img'>, keyof DOMAttributes<'img'>>,
        {
            src: string;
            style?: CSSProperties;
            alt?: string;
        }
    >,
    WithNoChildren
>;

function Image({ src, alt = '', className, style, ...otherProps }: ImageProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return <img src={src} alt={alt} className={className} style={style} {...otherProps} />;
}

// Need ImageMemo for autocompletion of phpstorm
const ImageMemo = withMemo(Image);
export { ImageMemo as Image };
