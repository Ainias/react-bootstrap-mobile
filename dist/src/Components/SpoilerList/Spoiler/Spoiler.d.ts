import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { ReactChild } from 'react';
import { OptionalListener } from '../../Hooks/useListener';
import { IconSource } from '../../Icon/Icon';
export type SpoilerProps<OnClickData> = RbmComponentProps<{
    title: ReactChild;
    initialOpen?: boolean;
    open?: boolean;
    noClosingAnimation?: boolean;
    openIcon?: IconSource | null;
    closeIcon?: IconSource | null;
} & OptionalListener<'onClick', OnClickData>>;
declare function Spoiler<OnClickData>({ title, children, initialOpen, noClosingAnimation, openIcon, closeIcon, className, style, open, ...listenerProps }: SpoilerProps<OnClickData>): React.JSX.Element;
declare const SpoilerMemo: typeof Spoiler;
export { SpoilerMemo as Spoiler };
