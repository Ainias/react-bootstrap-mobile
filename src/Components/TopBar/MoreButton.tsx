import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { TopBarButton } from './TopBarButton';
import { Icon } from '../Icon/Icon';
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { withMemo } from '../../helper/withMemo';

export type MoreButtonProps = RbmComponentProps<{
    disabled?: boolean;
    onClick?: () => void;
}>;

function MoreButton({ onClick, disabled, className }: MoreButtonProps) {
    // Variables

    // States

    // Refs

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <TopBarButton onClick={onClick} disabled={disabled} className={className}>
            <Icon icon={faEllipsisH} className="material-hidden" />
            <Icon icon={faEllipsisV} className="flat-hidden" />
        </TopBarButton>
    );
}
const MoreButtonMemo = withMemo(MoreButton);
export { MoreButtonMemo as MoreButton };
