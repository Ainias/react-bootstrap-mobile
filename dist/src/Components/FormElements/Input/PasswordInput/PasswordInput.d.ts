import { InputProps } from '../Input';
import { DistributiveOmit } from '../../../../helper/DistributiveOmit';
export declare type PasswordInputProps<OnChangeData, OnBlurData, OnChangeEndData> = DistributiveOmit<InputProps<OnChangeData, OnBlurData, OnChangeEndData>, 'type'>;
export declare const PasswordInput: import("../../../../helper/withForwardRef").RefComponent<PasswordInputProps<unknown, unknown, unknown>, HTMLInputElement>;
