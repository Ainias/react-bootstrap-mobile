import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
export type TopBarButtonProps = RbmComponentProps<{
    disabled?: boolean;
    onClick?: () => void;
}>;
declare function TopBarButton({ disabled, onClick, className, children, ...rbmProps }: TopBarButtonProps): React.JSX.Element;
declare const TopBarButtonMemo: typeof TopBarButton;
export { TopBarButtonMemo as TopBarButton };
