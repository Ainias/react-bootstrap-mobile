import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import * as React from 'react';
import {RbmComponentProps} from '../RbmComponentProps';
import {Override} from '../../TypeHelpers';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {withMemo} from '../../helper/withMemo';
import {IconDefinition} from '@fortawesome/free-regular-svg-icons';
import classNames from "classnames";

import styles from "./icon.scss";

export type IconSource = IconProp | string | IconDefinition;

export type IconProps = RbmComponentProps<
    Override<
        FontAwesomeIconProps,
        {
            noMargin?: boolean
            icon: IconSource;
            alt?: string;
        }
    >
>;

export const Icon = withMemo(function Icon({icon, alt, className, noMargin = true, style, title, ...props}: IconProps) {
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

    if (typeof icon === 'string' && (icon.indexOf('.') !== -1 || icon.startsWith("data:"))) {
        return <img src={icon} alt={alt} className={classNames(styles.imgIcon, className, {[styles.margin]: !noMargin})}
                    style={style} title={title}/>;
    }
    return <FontAwesomeIcon {...props} icon={icon as IconProp}
                            className={classNames(className, {[styles.margin]: !noMargin})} style={style}
                            title={title}/>;
}, styles);
