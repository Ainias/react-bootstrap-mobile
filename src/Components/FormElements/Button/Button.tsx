import * as React from 'react';
import { Override } from '@ainias42/js-helper';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';
import styles from './button.scss';
import classNames from 'classnames';
import { withMemo } from '../../../helper/withMemo';
import { HTMLAttributes, MouseEvent, useCallback } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { ButtonType } from "./ButtonType";
import { Flavor } from "../../Flavor";
import { Size } from "../../../Size";

export type ButtonProps<ClickData> = RbmComponentProps<
    Override<HTMLAttributes<HTMLButtonElement>, {
        type?: ButtonType,
        disabled?: boolean;
        flavor?: Flavor
        fullWidth?: boolean;
        stopPropagation?: boolean;
        size?: Omit<Size, "xxLarge" | "xLarge" | "large" | "xSmall">
    } & OptionalListener<'onClick', ClickData>>
>;

export const Button = withMemo(function Button<ClickData>({
                                                              children,
                                                              className,
                                                              disabled,
                                                              size,
                                                              fullWidth = false,
                                                              flavor = Flavor.Accent,
                                                              type = ButtonType.Primary,
    stopPropagation = true,
                                                              ...props
                                                          }: ButtonProps<ClickData>) {
    const [onClick, otherProps] = useListenerWithExtractedProps<'onClick', ClickData>('onClick', props);

    const realOnClick = useCallback((ev: MouseEvent) => {
        if (stopPropagation) {
            ev.stopPropagation();
        }
        onClick?.(ev);
    }, [onClick, stopPropagation]);

    const classes = {
        [styles.primary]: type === ButtonType.Primary,
        [styles.secondary]: type === ButtonType.Secondary,
        [styles.disabled]: disabled,
        [styles.small]: size === Size.small
    };

    return (
        <button {...otherProps} disabled={disabled} type="button" onClick={realOnClick}
                className={classNames(styles.button, {[styles.fullWidth]: fullWidth}, classes, flavor, className)}>
            {children}
        </button>
    );
}, styles);
