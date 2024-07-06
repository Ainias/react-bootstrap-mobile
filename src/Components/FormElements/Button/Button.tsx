import * as React from 'react';
import {Override} from '@ainias42/js-helper';
import {OptionalListener, useListenerWithExtractedProps} from '../../Hooks/useListener';

import styles from './button.scss';
import classNames from 'classnames';
import {withMemo} from '../../../helper/withMemo';
import {HTMLAttributes} from 'react';
import {RbmComponentProps} from '../../RbmComponentProps';
import {ButtonType} from "./ButtonType";
import {Flavor} from "../../Flavor";

export type ButtonProps<ClickData> = RbmComponentProps<
    Override<HTMLAttributes<HTMLButtonElement>, {
        type?: ButtonType,
        disabled?: boolean;
        flavor?: Flavor
    } & OptionalListener<'onClick', ClickData>>
>;

export const Button = withMemo(function Button<ClickData>({
                                                              children,
                                                              className,
                                                              disabled,
                                                              flavor = Flavor.Accent,
                                                              type = ButtonType.Primary,
                                                              ...props
                                                          }: ButtonProps<ClickData>) {
    const [onClick, otherProps] = useListenerWithExtractedProps<'onClick', ClickData>('onClick', props);

    const classes = {
        [styles.primary]: type === ButtonType.Primary,
        [styles.secondary]: type === ButtonType.Secondary,
        [styles.disabled]: disabled,
    };

    return (
        <button {...otherProps} disabled={disabled} type="button" onClick={onClick}
                className={classNames(styles.button, classes, flavor, className)}>
            {children}
        </button>
    );
}, styles);
