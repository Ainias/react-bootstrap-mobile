import * as React from 'react';
import {
    ForwardedRef,
    MouseEvent as ReactMouseEvent,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import styles from './window.scss';
import classNames from 'classnames';
import { faWindowMaximize, faWindowMinimize, faWindowRestore } from '@fortawesome/free-regular-svg-icons';
import { Clickable } from '../Clickable/Clickable';
import { Flex } from '../Layout/Flex';
import { Grow } from '../Layout/Grow';
import { InlineBlock } from '../Layout/InlineBlock';
import { Text } from '../Text/Text';
import { Block } from '../Layout/Block';
import { checkWindowDimension } from './checkWindowDimension';
import { changeDimension, changeDimensionHeight, changeDimensionWidth } from './changeDimension';
import { WINDOW_MIN_HEIGHT, WINDOW_MIN_WIDTH, WindowDimension } from './WindowDimension';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { WindowButton, WindowButtonProps } from './WindowButton';
import { Menu, MenuItem } from '../Menu/Menu';
import { withForwardRef } from '../../helper/withForwardRef';
import { RbmComponentProps, WithNoStringAndChildrenProps } from '../RbmComponentProps';

type ResizeDirection = 'top' | 'left' | 'right' | 'bottom' | 'tl' | 'tr' | 'bl' | 'br';
export type WindowButtonData = WindowButtonProps<any> & { key: string };
export type WindowState = 'normal' | 'minimized' | 'maximized' | 'popup';

export type WindowProps = RbmComponentProps<
    {
        title?: string;
        className?: string;
        initialTop?: number;
        initialLeft?: number;
        fillHeight?: boolean;
        id?: string;
        isActive?: boolean;
        onActive?: (_: any, id?: string) => void;
        defaultWidth?: number;
        buttons?: WindowButtonData[] | ((state: WindowState, defaultButtons: WindowButtonData[]) => WindowButtonData[]);
    },
    WithNoStringAndChildrenProps
>;

function localStorageKey(id: string) {
    return `window-data-${id}`;
}

export type WindowRef = {
    minimize(): void;
    maximize(): void;
    toggleMinimize(): void;
    toggleMaximize(): void;
    resizeToContent(): void;
    openInNewWindow(): void;
};

function Window(
    {
        children,
        className,
        title = '',
        initialTop = 200,
        initialLeft = 200,
        id,
        isActive,
        onActive,
        fillHeight,
        defaultWidth,
        buttons = [],
    }: WindowProps,
    ref?: ForwardedRef<WindowRef>
) {
    // Variables

    // Refs
    const windowContainerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);

    const windowSizes = useMemo(() => ({ x: -1, y: -1 }), []);

    // States
    const [dimension, setDimension] = useState<WindowDimension | undefined>(undefined);
    const [windowState, setWindowState] = useState<WindowState>('normal');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuX, setMenuX] = useState(0);
    const [menuY, setMenuY] = useState(0);

    const [loaded, setLoaded] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const [mouseDownPos, setMouseDownPos] = useState<undefined | { x: number; y: number }>(undefined);
    const [moveStartPos, setMoveStartPos] = useState(dimension);

    const [resizeStartPos, setResizeStartPos] = useState<undefined | { x: number; y: number }>(undefined);
    const [resizeDirection, setResizeDirection] = useState<undefined | ResizeDirection>();
    const [resizeStartDimension, setResizeStartDimension] = useState(dimension);

    // Selectors

    // Callbacks
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const openMenu = useCallback((ev: ReactMouseEvent) => {
        setIsMenuOpen(true);
        setMenuX(ev.clientX);
        setMenuY(ev.clientY);
    }, []);

    const save = useCallback(() => {
        if (!id || !loaded) {
            return;
        }
        const data = {
            ...dimension,
            windowState,
            windowX: window.innerWidth,
            windowY: window.innerHeight,
        };
        localStorage.setItem(localStorageKey(id), JSON.stringify(data));
    }, [dimension, id, loaded, windowState]);

    const load = useCallback(() => {
        if (!id) {
            return;
        }

        const dataString = localStorage.getItem(localStorageKey(id));
        if (dataString) {
            const data = JSON.parse(dataString);

            if (data.right !== undefined && data.windowX && data.windowX !== window.innerWidth) {
                changeDimensionWidth(data, data.windowX - window.innerWidth);
            }

            if (data.bottom !== undefined && data.windowY && data.windowY !== window.innerHeight) {
                changeDimensionHeight(data, data.windowY - window.innerHeight);
            }

            setDimension(checkWindowDimension(data));
            setWindowState(data.windowState ?? 'normal');
        }
        setLoaded(true);
    }, [id]);

    const getDimensions = useCallback(() => {
        if (windowContainerRef.current) {
            const computedStyles = window.getComputedStyle(windowContainerRef.current);
            return {
                top: parseFloat(computedStyles.getPropertyValue('top')),
                bottom: parseFloat(computedStyles.getPropertyValue('bottom')),
                left: parseFloat(computedStyles.getPropertyValue('left')),
                right: parseFloat(computedStyles.getPropertyValue('right')),
            };
        }
        return undefined;
    }, []);

    const resizeToContent = useCallback(() => {
        if (!windowRef.current || !titleRef.current || !contentRef.current) {
            return;
        }
        const realDimension = getDimensions();
        if (!realDimension) {
            return;
        }

        if (defaultWidth && windowContainerRef.current) {
            const currentWidth = window.innerWidth - realDimension.left - realDimension.right;
            if (currentWidth !== defaultWidth) {
                changeDimensionWidth(realDimension, defaultWidth - currentWidth);
                windowContainerRef.current.style.right = `${realDimension.right}px`;
                windowContainerRef.current.style.left = `${realDimension.left}px`;
            }
        }

        let diffY = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        const diffX = contentRef.current.scrollWidth - contentRef.current.clientWidth;

        if (diffY === 0) {
            diffY = titleRef.current.clientHeight + contentRef.current.clientHeight - windowRef.current.clientHeight;
        }

        changeDimension(realDimension, diffX, diffY);
        setDimension(checkWindowDimension(realDimension));
    }, [defaultWidth, getDimensions]);

    const toggleMinimized = useCallback(
        () => setWindowState((old) => (old === 'minimized' ? 'normal' : 'minimized')),
        []
    );
    const toggleMaximized = useCallback(
        () => setWindowState((old) => (old === 'maximized' ? 'normal' : 'maximized')),
        []
    );

    const onResizeStart = useCallback(
        (e: ReactMouseEvent, direction: ResizeDirection) => {
            setResizeDirection(direction);
            setResizeStartPos({ x: e.clientX, y: e.clientY });
            setResizeStartDimension(dimension);
        },
        [dimension]
    );

    const onMoveStart = useCallback(
        (e: ReactMouseEvent) => {
            setMouseDownPos({ x: e.clientX, y: e.clientY });
            setMoveStartPos(dimension);
        },
        [dimension]
    );

    const onMove = useCallback(
        (e: MouseEvent) => {
            if (!dimension) {
                return;
            }

            const newDimension = { ...dimension };
            if (resizeStartPos && resizeStartDimension) {
                const diff = { x: e.clientX - resizeStartPos.x, y: e.clientY - resizeStartPos.y };
                if (resizeDirection === 'top' || resizeDirection === 'tl' || resizeDirection === 'tr') {
                    newDimension.top = Math.min(
                        window.innerHeight - (resizeStartDimension.bottom ?? 0) - WINDOW_MIN_HEIGHT,
                        resizeStartDimension.top + diff.y
                    );
                }
                if (resizeDirection === 'bottom' || resizeDirection === 'bl' || resizeDirection === 'br') {
                    newDimension.bottom = Math.min(
                        window.innerHeight - resizeStartDimension.top - WINDOW_MIN_HEIGHT,
                        (resizeStartDimension.bottom ?? 0) - diff.y
                    );
                }
                if (resizeDirection === 'left' || resizeDirection === 'bl' || resizeDirection === 'tl') {
                    newDimension.left = Math.min(
                        window.innerWidth - (resizeStartDimension.right ?? 0) - WINDOW_MIN_WIDTH,
                        resizeStartDimension.left + diff.x
                    );
                }
                if (resizeDirection === 'right' || resizeDirection === 'br' || resizeDirection === 'tr') {
                    newDimension.right = Math.min(
                        window.innerWidth - resizeStartDimension.left - WINDOW_MIN_WIDTH,
                        (resizeStartDimension.right ?? 0) - diff.x
                    );
                }
            } else if (mouseDownPos && moveStartPos) {
                const diff = { x: e.clientX - mouseDownPos.x, y: e.clientY - mouseDownPos.y };
                const dimensions = getDimensions();
                if (!dimensions) {
                    return;
                }
                diff.y = Math.min(
                    Math.max(diff.y, -moveStartPos.top),
                    dimensions.top + (dimensions.bottom ?? 0) - moveStartPos.top
                );
                diff.x = Math.min(
                    Math.max(diff.x, -moveStartPos.left),
                    (dimensions.right ?? 0) + dimensions.left - moveStartPos.left
                );

                newDimension.top = moveStartPos.top + diff.y;
                newDimension.left = moveStartPos.left + diff.x;
                newDimension.bottom = moveStartPos.bottom - diff.y;
                newDimension.right = moveStartPos.right - diff.x;
            }

            if (mouseDownPos || resizeStartPos) {
                onActive?.(undefined, id);
                setDimension(newDimension);
            }
        },
        [
            dimension,
            getDimensions,
            id,
            mouseDownPos,
            moveStartPos,
            onActive,
            resizeDirection,
            resizeStartDimension,
            resizeStartPos,
        ]
    );

    const onMoveStop = useCallback(() => {
        setMouseDownPos(undefined);
        setResizeStartPos(undefined);
    }, []);

    const openInNewWindow = useCallback(() => {
        if (windowState === 'popup' || !containerRef.current || !windowContainerRef.current) {
            return;
        }
        const windowProxy = window.open('', '', 'modal=yes');
        if (windowProxy === null) {
            // new Toast('cannot open popups').show();
            return;
        }
        setWindowState('popup');

        const baseElement = document.createElement('base');
        baseElement.href = window.location.href;
        windowProxy.document.head.appendChild(baseElement);

        const titleElement = document.createElement('title');
        titleElement.innerText = title;
        windowProxy.document.head.appendChild(titleElement);

        document.querySelectorAll("link[rel='stylesheet']").forEach((styleElem) => {
            windowProxy.document.head.appendChild(styleElem.cloneNode());
        });
        document.querySelectorAll('style').forEach((styleElem) => {
            windowProxy.document.head.appendChild(styleElem.cloneNode(true));
        });
        document.body.classList.forEach((bodyClass) => {
            windowProxy.document.body.classList.add(bodyClass);
        });

        // TODO Theme-Checker?
        windowProxy.document.body.classList.add('flat-design');

        windowContainerRef.current.remove();
        windowProxy.document.body.appendChild(windowContainerRef.current);
        windowProxy.addEventListener('beforeunload', () => {
            setWindowState('normal');

            if (windowContainerRef.current) {
                windowContainerRef.current.remove();
                containerRef.current?.append(windowContainerRef.current);
            }
        });
    }, [title, windowState]);

    useImperativeHandle(
        ref,
        () => ({
            toggleMaximize: toggleMaximized,
            toggleMinimize: toggleMinimized,
            maximize() {
                if (windowState !== 'popup' && windowState !== 'maximized') {
                    toggleMaximized();
                }
            },
            minimize() {
                if (windowState !== 'popup' && windowState !== 'minimized') {
                    toggleMinimized();
                }
            },
            openInNewWindow() {
                if (windowState !== 'popup') {
                    openInNewWindow();
                }
            },
            resizeToContent() {
                if (windowState !== 'popup') {
                    resizeToContent();
                }
            },
        }),
        [openInNewWindow, resizeToContent, toggleMaximized, toggleMinimized, windowState]
    );

    // Effects
    useEffect(() => {
        window.addEventListener('mousemove', onMove);
        return () => window.removeEventListener('mousemove', onMove);
    }, [onMove]);
    useEffect(() => {
        window.addEventListener('mouseup', onMoveStop);
        return () => window.removeEventListener('mouseup', onMoveStop);
    }, [onMoveStop]);

    useEffect(() => {
        windowSizes.x = window.innerWidth;
        windowSizes.y = window.innerHeight;
        const listener = () => {
            if (!dimension) {
                return;
            }

            const diff = { x: windowSizes.x - window.innerWidth, y: windowSizes.y - window.innerHeight };
            windowSizes.x = window.innerWidth;
            windowSizes.y = window.innerHeight;

            const newDimension = { ...dimension };

            if (newDimension.left <= newDimension.right) {
                newDimension.right -= diff.x;
            } else {
                newDimension.left -= diff.x;
            }

            if (newDimension.top <= newDimension.bottom) {
                newDimension.bottom -= diff.y;
            } else {
                newDimension.top -= diff.y;
            }

            setDimension(checkWindowDimension(newDimension));
        };
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [dimension, windowSizes]);

    useEffect(() => {
        setDimension((old) => {
            if (old) {
                return old;
            }
            return getDimensions();
        });
    }, [getDimensions]);

    useEffect(() => save(), [save]);
    useEffect(() => load(), [load]);
    useEffect(() => setIsClient(true), []);

    // Other
    const realButtons = useMemo(() => {
        const defaultButtons: WindowButtonData[] = [
            {
                key: 'minimize-button',
                icon: faWindowMinimize,
                onClick: toggleMinimized,
            },
            {
                key: 'maximize-button',
                icon: windowState === 'maximized' ? faWindowRestore : faWindowMaximize,
                onClick: toggleMaximized,
            },
        ];
        if (typeof buttons === 'function') {
            return buttons(windowState, defaultButtons);
        }
        return [...defaultButtons, ...buttons];
    }, [buttons, toggleMaximized, toggleMinimized, windowState]);

    const menuItems = useMemo(() => {
        const items: MenuItem[] = [];
        if (windowState === 'normal') {
            items.push({
                key: 'resize',
                label: 'Resize',
                callback: resizeToContent,
            });
        }
        items.push({
            key: 'openInWindow',
            label: 'Open in new Window',
            callback: openInNewWindow,
        });
        return items;
    }, [openInNewWindow, resizeToContent, windowState]);

    const renderTitle = () => (
        <Clickable onMouseDown={onMoveStart} className={styles.fullWidth} ref={titleRef}>
            <Flex horizontal={true} className={styles.title}>
                <Grow className={styles.titleText}>
                    <Text>{title}</Text>
                </Grow>
                <InlineBlock className={styles.titleButtons}>
                    {realButtons?.map((b) => (
                        <WindowButton {...b} windowState={windowState} />
                    ))}
                    <WindowButton icon={faEllipsisV} onClick={openMenu} windowState={windowState} />
                    <Menu items={menuItems} x={menuX} y={menuY} isOpen={isMenuOpen} onClose={closeMenu} />
                </InlineBlock>
            </Flex>
        </Clickable>
    );

    // Render Functions

    return (
        <Clickable onClick={onActive} onClickData={id} ref={containerRef}>
            <Flex
                ref={windowContainerRef}
                className={classNames(styles.windowContainer, className, {
                    [styles.minimized]: windowState === 'minimized',
                    [styles.maximized]: windowState === 'maximized',
                    [styles.popup]: windowState === 'popup',
                    [styles.moving]: mouseDownPos,
                    [styles.active]: isActive,
                })}
                style={{
                    top: initialTop,
                    left: initialLeft,
                    right: defaultWidth && isClient ? window.innerWidth - initialLeft - defaultWidth : undefined,
                    ...(dimension ?? {}),
                    minWidth: WINDOW_MIN_WIDTH,
                    minHeight: WINDOW_MIN_HEIGHT,
                }}
            >
                <Flex horizontal={true} className={styles.fullWidth}>
                    <Clickable
                        className={classNames(styles.resize, styles.edge, styles.nw)}
                        onMouseDown={onResizeStart}
                        onMouseDownData="tl"
                    />
                    <Clickable
                        className={classNames(styles.resize, styles.y)}
                        onMouseDown={onResizeStart}
                        onMouseDownData="top"
                    />
                    <Clickable
                        className={classNames(styles.resize, styles.edge, styles.ne)}
                        onMouseDown={onResizeStart}
                        onMouseDownData="tr"
                    />
                </Flex>
                <Grow className={classNames(styles.fullWidth, styles.overflowHidden)}>
                    <Flex horizontal={true} className={classNames(styles.stretchItems, styles.fullHeight)}>
                        <Clickable
                            className={classNames(styles.resize, styles.x)}
                            onMouseDown={onResizeStart}
                            onMouseDownData="left"
                        />
                        <Grow className={styles.overflowXAuto}>
                            <Block className={styles.window} ref={windowRef}>
                                {renderTitle()}
                                <Block
                                    className={classNames(styles.content, { [styles.fillHeight]: fillHeight })}
                                    __allowChildren="all"
                                    ref={contentRef}
                                >
                                    {children}
                                </Block>
                            </Block>
                        </Grow>
                        <Clickable
                            className={classNames(styles.resize, styles.x)}
                            onMouseDown={onResizeStart}
                            onMouseDownData="right"
                        />
                    </Flex>
                </Grow>
                <Flex horizontal={true} className={styles.fullWidth}>
                    <Clickable
                        className={classNames(styles.resize, styles.edge, styles.sw)}
                        onMouseDown={onResizeStart}
                        onMouseDownData="bl"
                    />
                    <Clickable
                        className={classNames(styles.resize, styles.y)}
                        onMouseDown={onResizeStart}
                        onMouseDownData="bottom"
                    />
                    <Clickable
                        className={classNames(styles.resize, styles.edge, styles.se)}
                        onMouseDown={onResizeStart}
                        onMouseDownData="br"
                    />
                </Flex>
            </Flex>
        </Clickable>
    );
}

// Need WindowMemo for autocompletion of phpstorm
const WindowMemo = withForwardRef(Window, styles, 'html');
export { WindowMemo as Window };
