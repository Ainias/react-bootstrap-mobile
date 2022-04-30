import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { prefixClass } from '../../helper';
import { Override } from '../../TypeHelpers';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type IconSource = IconProp | string;

export type IconProps = RbmComponentProps<
    Override<
        FontAwesomeIconProps,
        {
            icon: IconSource;
            alt?: string;
        }
    >
>;

let Icon = function Icon({ icon, alt, className, ...props }: IconProps) {
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
        return <img src={icon} alt={alt} className={prefixClass('icon', className)} />;
    }
    return <FontAwesomeIcon {...props} icon={icon as IconProp} className={prefixClass('icon', className)} />;
};
Icon = React.memo(Icon) as typeof Icon;
export { Icon };
