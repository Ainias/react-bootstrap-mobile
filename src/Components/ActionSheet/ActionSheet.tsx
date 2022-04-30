import * as React from 'react';
import { RbmComponentProps } from '../RbmComponentProps';
import { Ref, useCallback, useImperativeHandle, useState } from 'react';
import { prefixClass } from '../../helper';
import { Clickable } from '../Clickable/Clickable';
import { Container } from 'react-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon, IconSource } from '../Icon/Icon';

export type ActionSheetAction<ActionData> = {
    name: string;
    icon?: IconSource;
    action: (data?: ActionData) => void;
    actionData?: ActionData;
    isDeleteAction?: boolean;
};

export type ActionSheetProps = RbmComponentProps<{
    title?: string;
    actions: ActionSheetAction<any>[];
    cancelText?: string;
    onClose?: () => void;
}>;

export type ActionSheetHandle = {
    show: () => void;
    hide: () => void;
};

const ActionSheet = React.memo(
    React.forwardRef(function ActionSheet(
        { title, actions, cancelText = 'Cancel', className, onClose }: ActionSheetProps,
        ref: Ref<ActionSheetHandle>
    ) {
        const [isOpen, setIsOpen] = useState(false);

        // Variables

        // States

        // Refs

        // Callbacks
        const close = useCallback(() => {
            setIsOpen(false);
            if (onClose) {
                onClose();
            }
        }, [setIsOpen, onClose]);
        const onActionClick = useCallback(
            (action?: ActionSheetAction<any>) => {
                close();
                action?.action(action.actionData);
            },
            [close]
        );

        useImperativeHandle(
            ref,
            () => ({
                show: () => setIsOpen(true),
                hide: close,
            }),
            [setIsOpen, close]
        );

        // Effects

        // Other

        const renderAction = (action: ActionSheetAction<any>) => (
            <Clickable
                key={action.name}
                className={prefixClass('action-sheet-action')}
                onClick={onActionClick}
                onClickData={action}
            >
                <span className={prefixClass('action-sheet-action-icon')}>
                    {action.icon ? <Icon icon={action.icon} /> : null}
                </span>
                <span className={prefixClass('action-sheet-name')}>{action.name}</span>
            </Clickable>
        );

        return (
            <Clickable
                className={prefixClass('action-sheet', [actions.length > 0 && isOpen ? 'open' : 'closed', className])}
                onClick={close}
            >
                <Container fluid="xxl" className="full-height">
                    <div className={prefixClass('action-sheet-content')}>
                        {title ? <div className={prefixClass('action-sheet-title')}>{title}</div> : null}
                        {actions.map(renderAction)}
                        <Clickable
                            className={prefixClass('action-sheet-cancel')}
                            onClick={() => console.log('Cancel clicked')}
                        >
                            <span className={prefixClass('action-sheet-action-icon')}>
                                <Icon icon={faTimes} />
                            </span>
                            {cancelText}
                        </Clickable>
                    </div>
                </Container>
            </Clickable>
        );
    })
);

export { ActionSheet };
