import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { Block } from '../Layout/Block';
import { Text } from '../Text/Text';
import { Clickable } from '../Clickable/Clickable';

import styles from './buttonDialog.scss';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import classNames from 'classnames';

export type ButtonDialogProps = RbmComponentProps<
    { title?: string; message: string; buttons: { text: string; callback: () => void }[] },
    WithNoChildren
>;

function ButtonDialog({ title, message, buttons, style, className }: ButtonDialogProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Block className={classNames(styles.buttonDialog, className)} style={style}>
            {!!title && (
                <Block className={styles.title}>
                    <Text>{title}</Text>
                </Block>
            )}
            <Block className={styles.message}>
                <Text>{message}</Text>
            </Block>
            <Block className={styles.buttonContainer}>
                {buttons.map((b, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Clickable onClick={b.callback} className={styles.button} key={i + b.text}>
                        <Text>{b.text}</Text>
                    </Clickable>
                ))}
            </Block>
        </Block>
    );
}

// Need ButtonDialogMemo for autocompletion of phpstorm
const ButtonDialogMemo = withMemo(ButtonDialog, styles);
export { ButtonDialogMemo as ButtonDialog };
