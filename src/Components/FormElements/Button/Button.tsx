import * as React from 'react';
import { Button as BSButton, ButtonProps as BSButtonProps } from 'react-bootstrap';
import { prefixClass } from '../../../helper';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListener } from '../../Hooks/useListener';

export type ButtonProps<ClickData> = Override<BSButtonProps, OptionalListener<'onClick', ClickData>>;

function Button<ClickData>({ children, ...props }: ButtonProps<ClickData>) {
    const onClick = useListener<'onClick', ClickData>('onClick', props);
    return (
        <BSButton {...props} onClick={onClick} bsPrefix={prefixClass('button')}>
            {children}
        </BSButton>
    );
}

const tmp = React.memo(Button) as typeof Button;
export { tmp as Button };
