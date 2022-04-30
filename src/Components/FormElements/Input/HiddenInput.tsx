import * as React from 'react';
import { Input, InputProps } from './Input';
import { prefixClass } from '../../../helper';

export type HiddenInputProps<OnChangeType> = InputProps<OnChangeType> & { noFocusHint?: boolean };

function HiddenInput<OnChangeData>({ noFocusHint = false, className, ...props }: HiddenInputProps<OnChangeData>) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    const noFocusHintClass = noFocusHint ? 'no-focus-hint' : undefined;

    return <Input className={prefixClass(['hidden-input', noFocusHintClass], className)} {...props} />;
}

const tmp = React.memo(HiddenInput) as typeof HiddenInput;
export { tmp as HiddenInput };
