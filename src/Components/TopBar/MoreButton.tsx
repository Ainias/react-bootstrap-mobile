import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { TopBarButton } from './TopBarButton';
import { Icon } from '../Icon/Icon';
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { prefixClass } from '../../helper';

export type MoreButtonProps = RbmComponentProps<{
    disabled?: boolean;
    onClick?: () => void;
}>;

let MoreButton = function MoreButton({ onClick, disabled, className }: MoreButtonProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <TopBarButton onClick={onClick} disabled={disabled} className={prefixClass('top-bar-more-button', className)}>
            <Icon icon={faEllipsisH} className="material-hidden" />
            <Icon icon={faEllipsisV} className="flat-hidden" />
        </TopBarButton>
    );
};
MoreButton = React.memo(MoreButton) as typeof MoreButton;
export { MoreButton };
