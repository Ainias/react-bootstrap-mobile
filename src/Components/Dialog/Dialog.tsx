import * as React from 'react';
import classNames from 'classnames';

import styles from './dialog.scss';
import { RbmComponentProps } from '../RbmComponentProps';
import { withMemo } from '../../helper/withMemo';
import { InlineBlock } from '../Layout/InlineBlock';
import { Block } from '../Layout/Block';
import { ReactElement, useCallback, useState } from 'react';
import { Clickable } from '../Clickable/Clickable';

export type DialogProps<ReturnData> = RbmComponentProps<
    {
        closable?: boolean;
        onClose?: (data?: ReturnData, identifier?: number) => void;
        identifier?: number;
    },
    {
        children: ReactElement<Record<string, any> & { close?: (data?: ReturnData) => void }> | string | number;
    }
>;

function Dialog<ReturnData>({
    style,
    children,
    className,
    closable = true,
    onClose,
    identifier,
}: DialogProps<ReturnData>) {
    // Variables
    const [isClosed, setIsClosed] = useState(false);

    // Refs

    // States

    // Selectors

    // Callbacks
    const close = useCallback(
        (data?: ReturnData) => {
            setIsClosed(true);
            onClose?.(data, identifier);
        },
        [identifier, onClose]
    );

    const onCurtainClick = useCallback(() => {
        if (!closable) {
            return;
        }
        close();
    }, [closable, close]);

    // Effects

    // Other

    // Render Functions
    if (isClosed) {
        return null;
    }

    return (
        <Block className={classNames(styles.dialogContainer, className)} __allowChildren="all" style={style}>
            <Clickable onClick={onCurtainClick} className={styles.closeCurtain} interactable={closable} />
            <InlineBlock __allowChildren="all" className={styles.dialog}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, { close });
                    }
                    return child;
                })}
            </InlineBlock>
        </Block>
    );
}

// Need Dialog Memo for autocompletion of phpstorm
const DialogMemo = withMemo(Dialog, styles);
export { DialogMemo as Dialog };
