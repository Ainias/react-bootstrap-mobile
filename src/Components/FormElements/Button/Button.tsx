import * as React from 'react';
import { Override } from '@ainias42/js-helper';
import { OptionalListener, useListener } from '../../Hooks/useListener';

import styles from './button.scss';
import classNames from 'classnames';
import { withMemo } from '../../../helper/withMemo';
import { HTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import {ButtonType} from "./ButtonType";

export type ButtonProps<ClickData> = RbmComponentProps<
    Override<HTMLAttributes<HTMLButtonElement>, {
    type?: ButtonType,
        disabled?: boolean;
    } & OptionalListener<'onClick', ClickData>>
>;

export const Button = withMemo(function Button<ClickData>({ children, className, disabled, type=ButtonType.Primary, ...props }: ButtonProps<ClickData>) {
    const onClick = useListener<'onClick', ClickData>('onClick', props);

    const classes = {
        [styles.primary]: type === ButtonType.Primary,
        [styles.secondary]: type === ButtonType.Secondary,
        [styles.disabled]: disabled,
    };

    return (
        <button {...props} disabled={disabled} type="button" onClick={onClick} className={classNames(styles.button, classes, className)}>
            {children}
        </button>
    );
}, styles);
