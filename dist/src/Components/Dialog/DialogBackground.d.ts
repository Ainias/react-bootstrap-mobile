import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { EmptyProps } from '../../helper/EmptyProps';
export type DialogBackgroundProps = RbmComponentProps<EmptyProps>;
declare function DialogBackground({ children, className, style }: DialogBackgroundProps): React.JSX.Element;
declare const DialogBackgroundMemo: typeof DialogBackground;
export { DialogBackgroundMemo as DialogBackground };
