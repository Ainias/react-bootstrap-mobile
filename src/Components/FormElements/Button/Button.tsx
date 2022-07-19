import * as React from 'react';
import { Button as BSButton, ButtonProps as BSButtonProps } from 'react-bootstrap';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListener } from '../../Hooks/useListener';

import styles from './button.scss';
import classNames from 'classnames';
import { withMemo } from '../../../helper/withMemo';

export type ButtonProps<ClickData> = Override<BSButtonProps, OptionalListener<'onClick', ClickData>>;

function Button<ClickData>({ children, ...props }: ButtonProps<ClickData>) {
    const onClick = useListener<'onClick', ClickData>('onClick', props);
    return (
        <BSButton {...props} onClick={onClick} bsPrefix={classNames(styles.button)}>
            {children}
        </BSButton>
    );
}

const ButtonMemo = withMemo(Button, styles);
export { ButtonMemo as Button };
