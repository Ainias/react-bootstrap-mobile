import * as React from 'react';
import { ChangeEventHandler, InputHTMLAttributes, MouseEvent, useCallback } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import classNames from 'classnames';
import styles from './switch.scss';
import { withMemo } from '../../../helper/withMemo';
import { OptionalListener, useListenerWithExtractedProps } from "../../Hooks/useListener";
import { FormError } from "../FormError";

export type SwitchProps<OnChangeCheckedData> = RbmComponentProps<
    Override<
        InputHTMLAttributes<HTMLInputElement>,
        {
            preLabel?: string;
            label?: string;
            children?: string;
            isLabelBeforeSwitch?: boolean;
            isDual?: boolean;
            error?: string;
            classNameLabel?: string;
            classNamePreLabel?: string;
            stopPropagation?: boolean;
        } & OptionalListener<"onChangeChecked", OnChangeCheckedData, boolean>
    >
>;

export const Switch = withMemo(function Switch<OnChangeCheckedData>({
                                                                        children,
                                                                        label = '',
                                                                        preLabel = '',
                                                                        isLabelBeforeSwitch = false,
                                                                        isDual = undefined,
                                                                        stopPropagation = true,
                                                                        id,
                                                                        className,
                                                                        classNamePreLabel,
                                                                        classNameLabel,
                                                                        style,
                                                                        error,
                                                                        onChange,
                                                                        ...props
                                                                    }: SwitchProps<OnChangeCheckedData>) {
        // Variables

        // States

        // Refs

        // Callbacks
        const [onChangeChecked, otherProps] = useListenerWithExtractedProps("onChangeChecked", props);

        const realOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
            (e) => {
                onChange?.(e);
                onChangeChecked(e.target.checked);
            },
            [onChange, onChangeChecked]
        );

        const checkStopPropagation = useCallback((ev: MouseEvent) => {
            if (stopPropagation) {
                console.log("LOG-d stopPropagation inside checkStopPropagation", ev);
                ev.stopPropagation();
                ev.nativeEvent.stopPropagation();
            }
        }, [stopPropagation]);

        // Effects

        // Other

        // Render Functions

        if (React.Children.count(children) === 1 && typeof children === 'string') {
            label = children;
        }

        if (isLabelBeforeSwitch) {
            [label, preLabel] = [preLabel, label];
        }

        if (label && preLabel && isDual === undefined) {
            isDual = true;
        }
        return (
            <span className={classNames(styles.switch, {[styles.dual]: isDual}, className)} style={style} onClick={checkStopPropagation}>
                <label htmlFor={id} key={id}>
                    <span className={classNames(styles.label, classNamePreLabel)}>{preLabel}</span>
                    <input {...otherProps} type="checkbox" id={id} onChange={realOnChange}/>
                    <div className={styles.toggle}>
                        <span className={styles.handle}/>
                    </div>
                    <span className={classNames(styles.label, classNameLabel)}>{label}</span>
                    <FormError error={error}/>
                </label>
            </span>);
    },
    styles);
