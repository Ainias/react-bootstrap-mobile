import * as React from 'react';
import { ChangeEventHandler, InputHTMLAttributes, useCallback } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import classNames from 'classnames';

import styles from './switch.scss';
import { withMemo } from '../../../helper/withMemo';
import {OptionalListener, useListenerWithExtractedProps} from "../../Hooks/useListener";

export type SwitchProps<OnChangeCheckedData> = RbmComponentProps<
    Override<
        InputHTMLAttributes<HTMLInputElement>,
        {
            preLabel?: string;
            label?: string;
            children?: string;
            isLabelBeforeSwitch?: boolean;
            isDual?: boolean;
        } & OptionalListener<"onChangeChecked", OnChangeCheckedData, boolean>
    >
>;

export const Switch = withMemo(function Switch<OnChangeCheckedData>({
    children,
    label = '',
    preLabel = '',
    isLabelBeforeSwitch = false,
    isDual = undefined,
    id,
    className,
    style,
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
        <span className={classNames(styles.switch, { [styles.dual]: isDual }, className)} style={style}>
            <label htmlFor={id} key={id}>
                <span className={styles.label}>{preLabel}</span>
                <input {...otherProps} type="checkbox" id={id} onChange={realOnChange} />
                <div className={styles.toggle}>
                    <span className={styles.handle} />
                </div>
                <span className={styles.label}>{label}</span>
            </label>
        </span>
    );
},
styles);
