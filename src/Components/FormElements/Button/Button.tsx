import * as React from 'react';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListener } from '../../Hooks/useListener';

import styles from './button.scss';
import classNames from 'classnames';
import { withMemo } from '../../../helper/withMemo';
import { HTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';

export type ButtonProps<ClickData> = RbmComponentProps<
    Override<HTMLAttributes<HTMLButtonElement>, OptionalListener<'onClick', ClickData>>
>;

function Button<ClickData>({ children, className, ...props }: ButtonProps<ClickData>) {
    const onClick = useListener<'onClick', ClickData>('onClick', props);
    return (
        <button {...props} type="button" onClick={onClick} className={classNames(styles.button, className)}>
            {children}
        </button>
    );
}

const ButtonMemo = withMemo(Button, styles);
export { ButtonMemo as Button };
