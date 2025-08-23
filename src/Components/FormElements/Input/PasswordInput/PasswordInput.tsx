import React, { ForwardedRef, useCallback, useState } from 'react';
import { Input, InputProps } from '../Input';
import { DistributiveOmit } from '../../../../helper/DistributiveOmit';
import { Flex } from '../../../Layout/Flex';
import { Grow } from '../../../Layout/Grow';
import { Icon } from '../../../Icon/Icon';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Clickable } from '../../../Clickable/Clickable';
import styles from './passwordInput.scss';
import classNames from 'classnames';
import { withMemo } from "../../../../helper/withMemo";

export type PasswordInputProps<OnChangeData, OnBlurData, OnChangeEndData> = DistributiveOmit<
    InputProps<OnChangeData, OnBlurData, OnChangeEndData>,
    'type'|"onChangeText"|"onEnter"
> & {
    onChangeText?: (newText: string) => void;
    onEnter?: (newText: string) => void;
    ref?: ForwardedRef<HTMLInputElement>
};

export const PasswordInput = withMemo(function PasswordInput<OnChangeData, OnBlurData, OnChangeEndData>(
    { className, style, ref,...props }: PasswordInputProps<OnChangeData, OnBlurData, OnChangeEndData>,
) {
    // Variables
    const [isVisible, setIsVisible] = useState(false);

    // Refs

    // States

    // Selectors

    // Callbacks
    const toggleVisible = useCallback(() => setIsVisible((old) => !old), []);

    // Effects

    // Other

    // Render Functions
    return (
        <Flex horizontal={true} className={classNames(styles.passwordInput, className)} style={style}>
            <Grow>
                <Input {...props} type={isVisible ? 'text' : 'password'} ref={ref} />
            </Grow>
            <Clickable onClick={toggleVisible} className={styles.showButton} interactable={false}>
                <Icon icon={isVisible ? faEye : faEyeSlash} />
            </Clickable>
        </Flex>
    );
},
styles);
