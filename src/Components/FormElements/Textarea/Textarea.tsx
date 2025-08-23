import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import {
    TextareaHTMLAttributes,
    useCallback,
    KeyboardEvent,
    ChangeEvent,
    CSSProperties, useRef, ForwardedRef
} from 'react';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';
import styles from './textarea.scss';
import classNames from 'classnames';
import { useOnChangeDone } from "../hooks/useOnChangeDone";
import { useComposedRef } from "../../Hooks/useComposedRef";
import { InlineBlock } from "../../Layout/InlineBlock";
import { Text } from "../../Text/Text";
import { withMemo } from "../../../helper/withMemo";

export type TextareaProps<OnChangeData, OnChangeDoneData> = RbmComponentProps<
    Override<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        {
            label?: string;
            onChangeText?: (newText: string) => void;
            onEnter?: (newText: string) => void;
            onEscape?: (newText: string) => void;
            textareaStyles?: CSSProperties & Record<`--${string}`, string | number | undefined>,
            containerRef?: ForwardedRef<HTMLLabelElement>
            ref?: ForwardedRef<HTMLTextAreaElement>
            error?: string,
        } & OptionalListener<'onChange', OnChangeData>
        & OptionalListener<'onChangeDone', OnChangeDoneData>
    >
>;

export const Textarea = withMemo(function Textarea<OnChangeData, OnChangeDoneData>({
                                                                                       label,
                                                                                       className,
                                                                                       style,
                                                                                       onKeyUp,
                                                                                       onChangeText,
                                                                                       onEnter,
                                                                                       onEscape,
                                                                                       textareaStyles,
                                                                                       containerRef,
                                                                                       ref,
                                                                                       error,
                                                                                       ...otherProps
                                                                                   }: TextareaProps<OnChangeData, OnChangeDoneData>) {
    // Refs
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const refSetter = useComposedRef(ref, innerRef);

    // Variables

    // States

    // Callbacks
    const [onChangeWithData, otherPropsWithoutOnchange] = useListenerWithExtractedProps<'onChange', OnChangeData>(
        'onChange',
        otherProps
    );
    const [onChangeDone, otherPropsWithoutData] = useListenerWithExtractedProps<'onChangeDone', OnChangeDoneData>(
        'onChangeDone',
        otherPropsWithoutOnchange
    );

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
            if (onKeyUp) {
                onKeyUp(e);
            }
            if (onEnter && e.key === 'Enter' && !e.defaultPrevented) {
                onEnter((e.target as HTMLTextAreaElement).value);
            }
            if (onEscape && e.key === 'Escape' && !e.defaultPrevented) {
                onEscape((e.target as HTMLTextAreaElement).value);
            }
        },
        [onEnter, onEscape, onKeyUp]
    );

    // Effects
    useOnChangeDone(onChangeDone, innerRef);


    // Other

    // Render Functions

    return (
        <label className={classNames(styles.container, className)} style={style} ref={containerRef}>
            {label ? <span className={styles.label}>{label}</span> : null}
            <textarea {...otherPropsWithoutData} style={textareaStyles} onKeyUp={realOnKeyPress}
                      className={styles.textarea} onChange={onChange} ref={refSetter}/>
            {error && <InlineBlock className={styles.error}><Text>{error}</Text></InlineBlock>}
        </label>
    );
}, styles);

