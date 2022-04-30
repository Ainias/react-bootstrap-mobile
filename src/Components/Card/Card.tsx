import * as React from 'react';
import { FunctionComponent } from 'react';
import { prefixClass } from '../../helper';
import { RbmComponentProps } from '../RbmComponentProps';

type Props = RbmComponentProps<{
    title?: string;
    fullHeight?: boolean;
    noPaddingHeight?: boolean;
    noPaddingWidth?: boolean;
    noPadding?: boolean;
    noMargin?: boolean;
}>;

export const Card: FunctionComponent<Props> = React.memo(
    ({
        title,
        children,
        fullHeight = false,
        noPaddingHeight = false,
        noPadding = false,
        noPaddingWidth = false,
        noMargin = false,
        className,
        ...rbmProps
    }) => {
        const classes = ['card'];
        if (fullHeight) classes.push('full-height');
        if (noPadding) classes.push('no-padding');
        if (noMargin) classes.push('no-margin');
        if (noPaddingHeight) classes.push('no-padding-height');
        if (noPaddingWidth) classes.push('no-padding-width');

        return (
            <div {...rbmProps} className={prefixClass(classes, className)}>
                {title ? <div className="title">{title}</div> : null}
                <div className="content">{children}</div>
            </div>
        );
    }
);
