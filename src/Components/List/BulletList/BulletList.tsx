import * as React from 'react';
import { withMemo } from '../../../helper/withMemo';
import { RbmComponentProps } from '../../RbmComponentProps';

export type BulletListProps = RbmComponentProps<{ numbered?: boolean }>;

function BulletList({ numbered = false, className, children, style }: BulletListProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other
    const props = { className, style };

    // Render Functions
    if (numbered) {
        return <ol {...props}>{children}</ol>;
    }

    return <ul {...props}>{children}</ul>;
}

// Need BulletListMemo for autocompletion of phpstorm
const BulletListMemo = withMemo(BulletList);
export { BulletListMemo as BulletList };
