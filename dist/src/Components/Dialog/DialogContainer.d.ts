import * as React from 'react';
import { PropsWithChildren } from 'react';
import { ShowDialog } from './DialogContext';
import { EmptyProps } from '../../helper/EmptyProps';
export type DialogContainerProps = PropsWithChildren<EmptyProps>;
export type DialogContainerRef = {
    showDialog: ShowDialog;
};
export declare const DialogContainer: import("../../helper/withForwardRef").RefComponent<{
    children?: React.ReactNode;
}, DialogContainerRef>;
