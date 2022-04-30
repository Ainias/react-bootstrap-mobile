import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { Override } from '../../../TypeHelpers';
import { TextareaHTMLAttributes, useCallback } from 'react';
import { OptionalListener, useListener } from '../../Hooks/useListener';
import { prefixClass } from '../../../helper';

export type TextareaProps<OnChangeData> = RbmComponentProps<
    Override<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        {
            label?: string;
            onChangeText?: (newText: string) => void;
        } & OptionalListener<'onChange', OnChangeData>
    >
>;

function Textarea<OnChangeData>({ label, className, onChangeText, ...otherProps }: TextareaProps<OnChangeData>) {
    // Variables

    // States

    // Refs

    // Callbacks
    const onChangeWithData = useListener<'onChange', OnChangeData>('onChange', otherProps);
    const onChange = useCallback(
        (e) => {
            if (onChangeText) {
                onChangeText(e.target.value);
            }
            onChangeWithData(e);
        },
        [onChangeWithData, onChangeText]
    );

    // Effects

    // Other

    // Render Functions

    return (
        <label className={prefixClass('textarea', className)}>
            {label ? <span className={prefixClass('textarea-label')}>{label}</span> : null}
            <textarea {...otherProps} className={prefixClass('textarea-text')} onChange={onChange} />
        </label>
    );
}

// Need TextareaMemo for autocompletion of phpstorm
const TextareaMemo = React.memo(Textarea) as typeof Textarea;
export { TextareaMemo as Textarea };
