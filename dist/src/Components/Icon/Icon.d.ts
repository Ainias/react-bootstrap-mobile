import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Override } from '../../TypeHelpers';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
export type IconSource = IconProp | string | IconDefinition;
export type IconProps = RbmComponentProps<Override<FontAwesomeIconProps, {
    icon: IconSource;
    alt?: string;
}>>;
declare function Icon({ icon, alt, className, style, title, ...props }: IconProps): React.JSX.Element;
declare const IconMemo: typeof Icon;
export { IconMemo as Icon };
