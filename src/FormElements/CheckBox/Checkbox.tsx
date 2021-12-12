import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { prefixClass } from '../../helper';
import { InputHTMLAttributes } from 'react';

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
        <span className={prefixClass(['checkbox'], className)}>
            <label htmlFor={id} key={id}>
                <span className={prefixClass('checkbox-label')}>{preLabel}</span>
                <input {...props} type="checkbox" id={id} className={prefixClass('checkbox-input')} />
                <span className={prefixClass('checkbox-checkmark')} />
                <span className={prefixClass('checkbox-label')}>{label}</span>
            </label>
        </span>
    );
}

const tmp = React.memo(Checkbox) as typeof Checkbox;
export { tmp as Checkbox };
