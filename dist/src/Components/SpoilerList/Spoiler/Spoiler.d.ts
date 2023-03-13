import { RbmComponentProps } from '../../RbmComponentProps';
import { ReactChild } from 'react';
import { OptionalListener } from '../../Hooks/useListener';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export type SpoilerProps<OnClickData> = RbmComponentProps<{
    title: ReactChild;
    initialOpen?: boolean;
    open?: boolean;
    noClosingAnimation?: boolean;
    openIcon?: IconProp | null;
    closeIcon?: IconProp | null;
} & OptionalListener<'onClick', OnClickData>>;
declare function Spoiler<OnClickData>({ title, children, initialOpen, noClosingAnimation, openIcon, closeIcon, className, style, open, ...listenerProps }: SpoilerProps<OnClickData>): JSX.Element;
declare const SpoilerMemo: typeof Spoiler;
export { SpoilerMemo as Spoiler };
