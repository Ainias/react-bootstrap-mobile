import * as React from 'react';
import { Override } from '@ainias42/js-helper';
import { OptionalListener } from '../../Hooks/useListener';
import { HTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { ButtonType } from "./ButtonType";
export type ButtonProps<ClickData> = RbmComponentProps<Override<HTMLAttributes<HTMLButtonElement>, {
    type?: ButtonType;
    disabled?: boolean;
} & OptionalListener<'onClick', ClickData>>>;
export declare const Button: <ClickData>({ children, className, disabled, type, ...props }: ButtonProps<ClickData>) => React.JSX.Element;
