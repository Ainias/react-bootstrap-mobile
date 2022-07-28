import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { InputHTMLAttributes } from 'react';

import styles from './checkbox.scss';
import { withMemo } from '../../../helper/withMemo';
import classNames from 'classnames';

export type CheckboxProps = RbmComponentProps<
    {
        label?: string;
        children?: string;
        isLabelBeforeCheckbox?: boolean;
    } & InputHTMLAttributes<HTMLInputElement>
>;

function Checkbox({ children, label = '', isLabelBeforeCheckbox = false, id, className, ...props }: CheckboxProps) {
    // Variables

    // States

    // Refs

    // Callbacks

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
        <span className={classNames(styles.checkbox, className)}>
            <label htmlFor={id} key={id}>
                <span className={styles.label}>{preLabel}</span>
                <input {...props} type="checkbox" id={id} className={styles.input} />
                <span className={styles.checkmark} />
                <span className={styles.label}>{label}</span>
            </label>
        </span>
    );
}

const tmp = withMemo(Checkbox, styles);
export { tmp as Checkbox };
