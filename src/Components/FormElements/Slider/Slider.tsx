import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { withMemo } from '../../../helper/withMemo';
import { ChangeEventHandler, InputHTMLAttributes, MutableRefObject, useCallback } from 'react';

import styles from './slider.scss';
import classNames from 'classnames';
import { Override } from '../../../TypeHelpers';
import { OptionalListener, useListenerWithExtractedProps } from '../../Hooks/useListener';
import { useOnChangeDone } from '../hooks/useOnChangeDone';

export type SliderProps<OnChangeData, OnChangeValueData, OnChangeDoneData> = RbmComponentProps<
    Override<
        Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>,
        {
            value?: number;
            stopPropagation?: boolean;
        } & OptionalListener<'onChange', OnChangeData> &
            OptionalListener<'onChangeValue', OnChangeValueData, number> &
            OptionalListener<'onChangeDone', OnChangeDoneData>
    >
>;

export const Slider = withMemo(function Slider<OnChangeData, OnChangeValueData, OnChangeDoneData>({
    className,
    style,
    stopPropagation = true,
    ...props
}: SliderProps<OnChangeData, OnChangeValueData, OnChangeDoneData>) {
    // Variables

    // Refs

    // States

    // Selectors

    // Callbacks
    const [onChange, otherPropsWithoutOnchange] = useListenerWithExtractedProps<'onChange', OnChangeData>(
        'onChange',
        props
    );

    const [onChangeValue, otherPropsWithoutOnChangeValue] = useListenerWithExtractedProps<
        'onChangeValue',
        OnChangeValueData
    >('onChangeValue', otherPropsWithoutOnchange);

    const [onChangeDone, otherPropsWithoutData] = useListenerWithExtractedProps<'onChangeDone', OnChangeDoneData>(
        'onChangeDone',
        otherPropsWithoutOnChangeValue
    );

    const innerOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
        (e) => {
            onChangeValue(Number(e.target.value));
            onChange(e);
        },
        [onChange, onChangeValue]
    );

    const checkStopPropagation = useCallback((ev: React.MouseEvent) => {
        if (stopPropagation) {
            ev.stopPropagation();
        }
    }, [stopPropagation]);

    // Effects
    const innerRef = useOnChangeDone(onChangeDone) as MutableRefObject<HTMLInputElement|null>;

    // Other

    // Render Functions

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={classNames(styles.slider, className)} style={style} onClick={checkStopPropagation}>
            <input
                type="range"
                {...otherPropsWithoutData}
                className={styles.input}
                onChange={innerOnChange}
                ref={innerRef}
            />
        </label>
    );
},
styles);
