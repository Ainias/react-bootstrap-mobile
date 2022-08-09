/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
export declare type MoreButtonProps = RbmComponentProps<{
    disabled?: boolean;
    onClick?: () => void;
}>;
declare function MoreButton({ onClick, disabled, className }: MoreButtonProps): JSX.Element;
declare const MoreButtonMemo: typeof MoreButton;
export { MoreButtonMemo as MoreButton };
