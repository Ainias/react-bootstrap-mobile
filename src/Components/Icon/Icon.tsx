import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Override } from '../../TypeHelpers';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { withMemo } from '../../helper/withMemo';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export type IconSource = IconProp | string | IconDefinition;

export type IconProps = RbmComponentProps<
    Override<
        FontAwesomeIconProps,
        {
            icon: IconSource;
            alt?: string;
        }
    >
>;

function Icon({ icon, alt, className, style, title, ...props }: IconProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other
    if (!alt && typeof icon === 'string') {
        alt = icon;
    }

    // Render Functions

    if (typeof icon === 'string' && icon.indexOf('.') !== -1) {
        return <img src={icon} alt={alt} className={className} style={style} title={title} />;
    }
    return <FontAwesomeIcon {...props} icon={icon as IconProp} className={className} style={style} title={title} />;
}

const IconMemo = withMemo(Icon);
export { IconMemo as Icon };
