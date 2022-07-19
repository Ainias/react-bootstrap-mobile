import * as React from 'react';
import { Input, InputProps } from './Input';
import { withMemo } from '../../../helper/withMemo';

import styles from './input.scss';
import classNames from 'classnames';

export type HiddenInputProps<OnChangeType> = InputProps<OnChangeType> & { noFocusHint?: boolean };

function HiddenInput<OnChangeData>({ noFocusHint = false, className, ...props }: HiddenInputProps<OnChangeData>) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions
    return (
        <Input
            className={classNames(styles.hiddenInput, { [styles.noFocusHint]: noFocusHint }, className)}
            {...props}
        />
    );
}

const tmp = withMemo(HiddenInput);
export { tmp as HiddenInput };
