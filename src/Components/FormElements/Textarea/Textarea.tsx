import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { TextareaHTMLAttributes, useCallback, KeyboardEvent, ChangeEvent } from 'react';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { classes } from '../../../helper';
import { withMemo } from '../../../helper/withMemo';

import styles from './textarea.scss';

export type TextareaProps<OnChangeData> = RbmComponentProps<
    Override<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        {
            label?: string;
            onChangeText?: (newText: string) => void;
            onEnter?: (newText: string) => void;
        } & OptionalListener<'onChange', OnChangeData>
    >
>;

function Textarea<OnChangeData>({
    label,
    className,
    onKeyPress,
    onChangeText,
    onEnter,
    ...otherProps
}: TextareaProps<OnChangeData>) {
    // Variables

    // States

    // Refs

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            if (onChangeText) {
                onChangeText(e.target.value);
            }
            onChangeWithData(e);
        },
        [onChangeWithData, onChangeText]
    );

    const realOnKeyPress = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (onKeyPress) {
                onKeyPress(e);
            }
            if (onEnter && e.key === 'Enter' && !e.defaultPrevented) {
                onEnter((e.target as HTMLTextAreaElement).value);
            }
        },
        [onEnter, onKeyPress]
    );

    // Effects

    // Other

    // Render Functions

    return (
        <>
            <label className={classes(styles.container, className)}>
                {label ? <span className={styles.label}>{label}</span> : null}
                <textarea {...otherProps} onKeyPress={realOnKeyPress} className={styles.textarea} onChange={onChange} />
            </label>
        </>
    );
}

// Need TextareaMemo for autocompletion of phpstorm
const TextareaMemo = withMemo(Textarea, styles);
export { TextareaMemo as Textarea };
