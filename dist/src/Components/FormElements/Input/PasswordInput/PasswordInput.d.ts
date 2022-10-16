import { InputProps } from '../Input';
import { DistributiveOmit } from '../../../../helper/DistributiveOmit';
export declare type PasswordInputProps<OnChangeData> = DistributiveOmit<InputProps<OnChangeData>, 'type'>;
export declare const PasswordInput: import("../../../../helper/withForwardRef").RefComponent<PasswordInputProps<unknown>, HTMLInputElement>;
