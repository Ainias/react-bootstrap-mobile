import * as React from 'react';
import { FunctionComponent } from 'react';
import { Button as BSButton, ButtonProps } from 'react-bootstrap';
import { prefixClass } from '../../helper';

type Props = ButtonProps;

export const Button: FunctionComponent<Props> = React.memo(({ children, ...props }) => {
    return (
        <BSButton {...props} bsPrefix={prefixClass('button')}>
            {children}
        </BSButton>
    );
});
