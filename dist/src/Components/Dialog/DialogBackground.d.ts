import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export type DialogBackgroundProps = RbmComponentProps<{
    title?: string;
}>;
export declare const DialogBackground: ({ children, className, style, title }: DialogBackgroundProps) => React.JSX.Element;
