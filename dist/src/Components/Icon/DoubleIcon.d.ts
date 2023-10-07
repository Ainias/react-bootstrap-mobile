import React from 'react';
import { IconProps, IconSource } from "./Icon";
export type DoubleIconProps = IconProps & {
    secondIcon: IconSource;
    secondIconColor?: string;
};
export declare const DoubleIcon: ({ secondIcon, secondIconColor, color, ...otherProps }: DoubleIconProps) => React.JSX.Element;
