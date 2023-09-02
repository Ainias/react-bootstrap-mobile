import React from 'react';
import {withMemo} from "../../helper/withMemo";
import {InlineBlock} from "../Layout/InlineBlock";
import {Icon, IconProps, IconSource} from "./Icon";

import styles from "./icon.scss";

export type DoubleIconProps = IconProps & {
	secondIcon: IconSource;
	secondIconColor?: string;
}

export const DoubleIcon = withMemo(function DoubleIcon({secondIcon, secondIconColor, color, ...otherProps}: DoubleIconProps) {
    // Refs

    // States/Variables/Selectors

    // Dispatch

    // Callbacks

    // Effects

    // Other

    // RenderFunctions

    return <InlineBlock className={styles.doubleIconContainer}>
		<Icon {...otherProps} color={color}/>
		<Icon icon={secondIcon} size="xs"
			  className={styles.secondIcon}
			  color={secondIconColor ?? color}/>
	</InlineBlock>;
}, styles);
