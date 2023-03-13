import { Override } from '../../../TypeHelpers';
import { OptionalListener } from '../../Hooks/useListener';
import { HTMLAttributes } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
export type ButtonProps<ClickData> = RbmComponentProps<Override<HTMLAttributes<HTMLButtonElement>, OptionalListener<'onClick', ClickData>>>;
declare function Button<ClickData>({ children, className, ...props }: ButtonProps<ClickData>): JSX.Element;
declare const ButtonMemo: typeof Button;
export { ButtonMemo as Button };
