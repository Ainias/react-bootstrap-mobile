import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import {
    TextareaHTMLAttributes,
    useCallback,
    KeyboardEvent,
    ChangeEvent,
    MutableRefObject,
    CSSProperties
} from 'react';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';

import styles from './textarea.scss';
import classNames from 'classnames';
import { withForwardRef } from "../../../helper/withForwardRef";
import { useOnChangeDone } from "../hooks/useOnChangeDone";
import { useComposedRef } from "../../Hooks/useComposedRef";

export type TextareaProps<OnChangeData, OnChangeDoneData> = RbmComponentProps<
    Override<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        {
            label?: string;
            onChangeText?: (newText: string) => void;
            onEnter?: (newText: string) => void;
            onEscape?: (newText: string) => void;
            textareaStyles?: CSSProperties & Record<`--${string}`, string | number | undefined>,
            containerRef?: MutableRefObject<HTMLLabelElement|null>
        } & OptionalListener<'onChange', OnChangeData>
        & OptionalListener<'onChangeDone', OnChangeDoneData>
    >
>;

export const Textarea = withForwardRef(function Textarea<OnChangeData, OnChangeDoneData>({
                                                                                             label,
                                                                                             className,
                                                                                             style,
                                                                                             onKeyUp,
                                                                                             onChangeText,
                                                                                             onEnter,
                                                                                             onEscape,
                                                                                             textareaStyles,
                                                                                             containerRef,
                                                                                             ...otherProps
                                                                                         }: TextareaProps<OnChangeData, OnChangeDoneData>, ref: MutableRefObject<HTMLTextAreaElement> | null) {
    // Refs
    const innerRef = useComposedRef(ref);

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
                      className={styles.textarea} onChange={onChange} ref={innerRef}/>
        </label>
    );
}, styles);

