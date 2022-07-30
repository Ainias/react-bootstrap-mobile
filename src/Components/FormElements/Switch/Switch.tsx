import * as React from 'react';
import { InputHTMLAttributes, useCallback } from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import classNames from 'classnames';

import styles from './switch.scss';
import { withMemo } from '../../../helper/withMemo';

export type SwitchProps = RbmComponentProps<
    Override<
        InputHTMLAttributes<HTMLInputElement>,
        {
            preLabel?: string;
            label?: string;
            children?: string;
            isLabelBeforeSwitch?: boolean;
            isDual?: boolean;
            onChangeChecked?(isChecked: boolean): void;
        }
    >
>;

function Switch({
    children,
    label = '',
    preLabel = '',
    isLabelBeforeSwitch = false,
    isDual = undefined,
    id,
    className,
    onChange,
    onChangeChecked,
    ...props
}: SwitchProps) {
    // Variables

    // States

    // Refs

    // Callbacks
    const realOnChange = useCallback(
        (e) => {
            if (onChange) {
                onChange(e);
            }
            if (onChangeChecked) {
                onChangeChecked(e.target.checked);
            }
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
        <span className={classNames(styles.switch, { [styles.dual]: isDual }, className)}>
            <label htmlFor={id} key={id}>
                <span className={styles.label}>{preLabel}</span>
                <input {...props} type="checkbox" id={id} onChange={realOnChange} />
                <div className={styles.toggle}>
                    <span className={styles.handle} />
                </div>
                <span className={styles.label}>{label}</span>
            </label>
        </span>
    );
}

const SwitchMemo = withMemo(Switch, styles);
export { SwitchMemo as Switch };