import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { CSSProperties, DOMAttributes } from 'react';
import { Override } from '../../TypeHelpers';

import styles from './image.scss';
import classNames from 'classnames';

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

    return <img src={src} alt={alt} className={classNames(styles.image, className)} style={style} {...otherProps} />;
}

// Need ImageMemo for autocompletion of phpstorm
const ImageMemo = withMemo(Image, styles);
export { ImageMemo as Image };
