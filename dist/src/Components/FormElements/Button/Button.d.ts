import * as React from 'react';
import { Override } from '@ainias42/js-helper';
import { OptionalListener } from '../../Hooks/useListener';
import { HTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { ButtonType } from "./ButtonType";
import { Flavor } from "../../Flavor";
export type ButtonProps<ClickData> = RbmComponentProps<Override<HTMLAttributes<HTMLButtonElement>, {
    type?: ButtonType;
    disabled?: boolean;
    flavor?: Flavor;
} & OptionalListener<'onClick', ClickData>>>;
export declare const Button: <ClickData>({ children, className, disabled, flavor, type, ...props }: ButtonProps<ClickData>) => React.JSX.Element;
