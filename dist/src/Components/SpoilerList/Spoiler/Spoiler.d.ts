import { RbmComponentProps } from '../../RbmComponentProps';
import { ReactChild } from 'react';
import { OptionalListener } from '../../Hooks/useListener';
export declare type SpoilerProps<OnClickData> = RbmComponentProps<{
    title: ReactChild;
    initialOpen?: boolean;
    open?: boolean;
    noClosingAnimation?: boolean;
} & OptionalListener<'onClick', OnClickData>>;
declare function Spoiler<OnClickData>({ title, children, initialOpen, noClosingAnimation, className, open, ...listenerProps }: SpoilerProps<OnClickData>): JSX.Element;
declare const SpoilerMemo: typeof Spoiler;
export { SpoilerMemo as Spoiler };
