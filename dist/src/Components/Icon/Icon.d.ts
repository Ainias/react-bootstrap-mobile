/// <reference types="react" />
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { RbmComponentProps } from '../RbmComponentProps';
import { Override } from '../../TypeHelpers';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export type IconSource = IconProp | string;
export type IconProps = RbmComponentProps<Override<FontAwesomeIconProps, {
    icon: IconSource;
    alt?: string;
}>>;
declare function Icon({ icon, alt, className, style, title, ...props }: IconProps): JSX.Element;
declare const IconMemo: typeof Icon;
export { IconMemo as Icon };
