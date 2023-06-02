import * as React from 'react';
import { PropsWithChildren } from 'react';
import { EmptyProps } from '../../helper/EmptyProps';
export type DialogContainerProps = PropsWithChildren<EmptyProps>;
declare function DialogContainer({ children }: DialogContainerProps): React.JSX.Element;
declare const DialogContainerMemo: typeof DialogContainer;
export { DialogContainerMemo as DialogContainer };
