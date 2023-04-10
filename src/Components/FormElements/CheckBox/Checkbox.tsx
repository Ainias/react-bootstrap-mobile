import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { ChangeEventHandler, InputHTMLAttributes, useCallback } from 'react';

import styles from './checkbox.scss';
import { withMemo } from '../../../helper/withMemo';
import classNames from 'classnames';
import { Override } from '@ainias42/js-helper';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';

export type CheckboxProps<OnChangeData, OnChangeCheckedData> = RbmComponentProps<
    Override<
        InputHTMLAttributes<HTMLInputElement>,
        {
            label?: string;
            children?: string;
            isLabelBeforeCheckbox?: boolean;
        } & OptionalListener<'onChange', OnChangeData> &
            OptionalListener<'onChangeChecked', OnChangeCheckedData, boolean>
    >
>;

function Checkbox<OnChangeData, OnChangeCheckedData>({
    children,
    label = '',
    isLabelBeforeCheckbox = false,
    id,
    className,
    style,
    ...props
}: CheckboxProps<OnChangeData, OnChangeCheckedData>) {
    // Variables

    // States

    // Refs

    // Callbacks
    const [onChange, otherPropsWithoutChange] = useListenerWithExtractedProps<'onChange', OnChangeData>(
        'onChange',
        props
    );

    const [onChangeChecked, otherPropsWithoutData] = useListenerWithExtractedProps<
        'onChangeChecked',
        OnChangeCheckedData
    >('onChangeChecked', otherPropsWithoutChange);

    const onChangeInner = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            onChangeChecked(e.target.checked);
            onChange(e);
        },
        [onChange, onChangeChecked]
    );

    // Effects

    // Other

    // Render Functions
    if (React.Children.count(children) === 1 && typeof children === 'string') {
        label = children;
    }

    let preLabel = '';
    if (isLabelBeforeCheckbox) {
        [label, preLabel] = [preLabel, label];
    }

    return (
        <span className={classNames(styles.checkbox, className)} style={style}>
            <label htmlFor={id} key={id}>
                <span className={styles.label}>{preLabel}</span>
                <input
                    {...otherPropsWithoutData}
                    type="checkbox"
                    id={id}
                    className={styles.input}
                    onChange={onChangeInner}
                />
                <span className={styles.checkmark} />
                <span className={styles.label}>{label}</span>
            </label>
        </span>
    );
}

const tmp = withMemo(Checkbox, styles);
export { tmp as Checkbox };
