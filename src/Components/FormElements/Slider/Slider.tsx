import * as React from 'react';
import { RbmComponentProps } from '../../RbmComponentProps';
import { withMemo } from '../../../helper/withMemo';
import { InputHTMLAttributes, useCallback } from 'react';

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
        } & OptionalListener<'onChange', OnChangeData> &
            OptionalListener<'onChangeValue', OnChangeValueData, number> &
            OptionalListener<'onChangeDone', OnChangeDoneData>
    >
>;

export const Slider = withMemo(function Slider<OnChangeData, OnChangeValueData, OnChangeDoneData>({
    className,
    style,
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

    const innerOnChange = useCallback(
        (e) => {
            onChangeValue(Number(e.target.value));
            onChange(e);
        },
        [onChange, onChangeValue]
    );

    // Effects
    const innerRef = useOnChangeDone(onChangeDone);

    // Other

    // Render Functions

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label className={classNames(styles.slider, className)} style={style}>
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
