import { RbmComponentProps } from '../RbmComponentProps';
import { IconSource } from '../Icon/Icon';
export declare type ActionSheetAction<ActionData> = {
    name: string;
    icon?: IconSource;
    action: (data?: ActionData) => void;
    actionData?: ActionData;
    isDeleteAction?: boolean;
};
export declare type ActionSheetProps = RbmComponentProps<{
    title?: string;
    actions: ActionSheetAction<any>[];
    cancelText?: string;
    onClose?: () => void;
}>;
export declare type ActionSheetHandle = {
    show: () => void;
    hide: () => void;
};
declare const ActionSheetMemo: import("../../helper/withForwardRef").RefComponent<ActionSheetProps, ActionSheetHandle>;
export { ActionSheetMemo as ActionSheet };
