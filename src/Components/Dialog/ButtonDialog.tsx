import * as React from 'react';
import { ReactElement } from 'react';
import { withMemo } from '../../helper/withMemo';
import { Block } from '../Layout/Block';
import { Text, TEXT_SIZE } from '../Text/Text';
import { Clickable } from '../Clickable/Clickable';
import styles from './buttonDialog.scss';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import classNames from 'classnames';
import { Flavor } from "../Flavor";

export type ButtonDialogProps = RbmComponentProps<
    {
        title?: string;
        message: string;
        buttons: { text: string; callback: () => void, flavor?: Flavor }[]
        extraContent?: ReactElement|null
    },
    WithNoChildren
>;

function ButtonDialog({ title, message, buttons, style, className, extraContent }: ButtonDialogProps) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions

    return (
        <Block className={classNames(styles.buttonDialog, className)} style={style} >
            {!!title && (
                <Block>
                    <Text size={TEXT_SIZE.large} className={styles.title}>{title}</Text>
                </Block>
            )}
            <Block>
                <Text className={styles.message}>{message}</Text>
            </Block>
            {extraContent}
            <Block className={styles.buttonContainer}>
                {buttons.map((b, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Clickable onClick={b.callback} className={classNames(styles.button)} key={i + b.text}>
                        <Text className={classNames(styles.buttonText, b.flavor ?? Flavor.Accent)}>{b.text}</Text>
                    </Clickable>
                ))}
            </Block>
        </Block>
    );
}

// Need ButtonDialogMemo for autocompletion of phpstorm
const ButtonDialogMemo = withMemo(ButtonDialog, styles);
export { ButtonDialogMemo as ButtonDialog };
