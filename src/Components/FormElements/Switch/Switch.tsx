import * as React from 'react';
import { FunctionComponent, InputHTMLAttributes, useCallback } from 'react';
import { prefixClass } from '../../../helper';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';

type Props = RbmComponentProps<
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

export const Switch: FunctionComponent<Props> = React.memo(
    ({
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
    }) => {
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
            <span className={prefixClass(['switch', isDual ? 'dual' : undefined], className)}>
                <label htmlFor={id} key={id}>
                    <span className={prefixClass('switch-label')}>{preLabel}</span>
                    <input {...props} type="checkbox" id={id} onChange={realOnChange} />
                    <div className={prefixClass('switch-toggle')}>
                        <span className={prefixClass('switch-handle')} />
                    </div>
                    <span className={prefixClass('switch-label')}>{label}</span>
                </label>
            </span>
        );
    }
);
