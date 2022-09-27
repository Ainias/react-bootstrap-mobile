import * as React from 'react';
import {
    MouseEvent as ReactMouseEvent,
    PropsWithChildren,
    useCallback,
    useEffect,
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
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { Block } from '../Layout/Block';
import { withMemo } from '../../helper/withMemo';

const MIN_WIDTH = 150;
const MIN_HEIGHT = 50;

type ResizeDirection = 'top' | 'left' | 'right' | 'bottom' | 'tl' | 'tr' | 'bl' | 'br';

export type WindowProps = PropsWithChildren<{
    title?: string;
    className?: string;
    initialTop?: number;
    initialLeft?: number;
    id?: string;
    isActive?: boolean;
    onActive?: (_: any, id?: string) => void;
}>;

function localStorageKey(id: string) {
    return `window-data-${id}`;
}

function Window({
    children,
    className,
    title = '',
    initialTop = 200,
    initialLeft = 200,
    id,
    isActive,
    onActive,
}: WindowProps) {
    // Variables

    // Refs
    const windowRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);
    const windowSizes = useMemo(() => ({ x: -1, y: -1 }), []);

    // States
    const [top, setTop] = useState(initialTop);
    const [left, setLeft] = useState(initialLeft);
    const [bottom, setBottom] = useState<undefined | number>();
    const [right, setRight] = useState<undefined | number>();
    const [windowState, setWindowState] = useState<'normal' | 'minimized' | 'maximized' | 'popup'>('normal');

    const [loaded, setLoaded] = useState(false);

    const [mouseDownPos, setMouseDownPos] = useState<undefined | { x: number; y: number }>(undefined);
    const [moveStartPos, setMoveStartPos] = useState({ top, left, bottom, right });

    const [resizeStartPos, setResizeStartPos] = useState<undefined | { x: number; y: number }>(undefined);
    const [resizeDirection, setResizeDirection] = useState<undefined | ResizeDirection>();
    const [resizeStartDimension, setResizeStartDimension] = useState({ top, left, bottom, right });

    // Selectors

    // Callbacks
    const save = useCallback(() => {
        if (!id || !loaded) {
            return;
        }
        const data = {
            top,
            left,
            bottom,
            right,
            windowState,
        };
        localStorage.setItem(localStorageKey(id), JSON.stringify(data));
    }, [bottom, id, left, loaded, right, top, windowState]);

    const getDimensions = useCallback(
        (useRealDimensions = false) => {
            let [newBottom, newRight] = [bottom, right];
            if ((!newBottom || !newRight || useRealDimensions) && windowRef.current) {
                const computedStyles = window.getComputedStyle(windowRef.current);
                [newBottom, newRight] = [
                    parseFloat(computedStyles.getPropertyValue('bottom')),
                    parseFloat(computedStyles.getPropertyValue('right')),
                ];
                if (!useRealDimensions) {
                    setBottom(newBottom);
                    setRight(newRight);
                }
            }
            return { top, left, right: newRight, bottom: newBottom };
        },
        [bottom, left, right, top]
    );

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
            setResizeStartDimension(getDimensions());
        },
        [getDimensions]
    );

    const onMoveStart = useCallback(
        (e: ReactMouseEvent) => {
            setMouseDownPos({ x: e.clientX, y: e.clientY });
            setMoveStartPos(getDimensions());
        },
        [getDimensions]
    );

    const onMove = useCallback(
        (e: MouseEvent) => {
            if (resizeStartPos) {
                const diff = { x: e.clientX - resizeStartPos.x, y: e.clientY - resizeStartPos.y };
                if (resizeDirection === 'top' || resizeDirection === 'tl' || resizeDirection === 'tr') {
                    setTop(
                        Math.min(
                            window.innerHeight - (resizeStartDimension.bottom ?? 0) - MIN_HEIGHT,
                            resizeStartDimension.top + diff.y
                        )
                    );
                }
                if (resizeDirection === 'bottom' || resizeDirection === 'bl' || resizeDirection === 'br') {
                    setBottom(
                        Math.min(
                            window.innerHeight - resizeStartDimension.top - MIN_HEIGHT,
                            (resizeStartDimension.bottom ?? 0) - diff.y
                        )
                    );
                }
                if (resizeDirection === 'left' || resizeDirection === 'bl' || resizeDirection === 'tl') {
                    setLeft(
                        Math.min(
                            window.innerWidth - (resizeStartDimension.right ?? 0) - MIN_WIDTH,
                            resizeStartDimension.left + diff.x
                        )
                    );
                }
                if (resizeDirection === 'right' || resizeDirection === 'br' || resizeDirection === 'tr') {
                    setRight(
                        Math.min(
                            window.innerWidth - resizeStartDimension.left - MIN_WIDTH,
                            (resizeStartDimension.right ?? 0) - diff.x
                        )
                    );
                }
            } else if (mouseDownPos) {
                const diff = { x: e.clientX - mouseDownPos.x, y: e.clientY - mouseDownPos.y };
                const dimensions = getDimensions(true);
                diff.y = Math.min(
                    Math.max(diff.y, -moveStartPos.top),
                    dimensions.top + (dimensions.bottom ?? 0) - moveStartPos.top
                );
                diff.x = Math.min(
                    Math.max(diff.x, -moveStartPos.left),
                    (dimensions.right ?? 0) + dimensions.left - moveStartPos.left
                );

                setTop(moveStartPos.top + diff.y);
                setLeft(moveStartPos.left + diff.x);
                if (moveStartPos.bottom !== undefined) {
                    setBottom(moveStartPos.bottom - diff.y);
                }
                if (moveStartPos.right !== undefined) {
                    setRight(moveStartPos.right - diff.x);
                }
            }

            if (mouseDownPos || resizeStartPos) {
                onActive?.(undefined, id);
            }
        },
        [
            getDimensions,
            id,
            mouseDownPos,
            moveStartPos,
            onActive,
            resizeDirection,
            resizeStartDimension.bottom,
            resizeStartDimension.left,
            resizeStartDimension.right,
            resizeStartDimension.top,
            resizeStartPos,
        ]
    );

    const onMoveStop = useCallback(() => {
        setMouseDownPos(undefined);
        setResizeStartPos(undefined);
    }, []);

    const openInNewWindow = useCallback(() => {
        if (windowState === 'popup' || !containerRef.current || !windowRef.current) {
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

        windowRef.current.remove();
        windowProxy.document.body.appendChild(windowRef.current);
        windowProxy.addEventListener('beforeunload', () => {
            setWindowState('normal');

            if (windowRef.current) {
                windowRef.current.remove();
                containerRef.current?.append(windowRef.current);
            }
        });
    }, [title, windowState]);

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
            const diff = { x: windowSizes.x - window.innerWidth, y: windowSizes.y - window.innerHeight };
            windowSizes.x = window.innerWidth;
            windowSizes.y = window.innerHeight;

            let [newLeft, newRight = -1, newTop, newBottom = -1] = [left, right, top, bottom];

            if (right !== undefined && left <= right) {
                newRight -= diff.x;
            } else {
                newLeft -= diff.x;
            }

            if (bottom !== undefined && top <= bottom) {
                newBottom -= diff.y;
            } else {
                newTop -= diff.y;
            }

            if (window.innerWidth < newRight) {
                newRight = window.innerWidth;
            }
            if (window.innerWidth < newLeft) {
                newLeft = window.innerWidth;
            }

            if (window.innerHeight < newBottom) {
                newBottom = window.innerHeight;
            }
            if (window.innerHeight < newTop) {
                newTop = window.innerHeight;
            }

            setTop(newTop);
            setLeft(newLeft);
            if (newBottom >= 0) {
                setBottom(newBottom);
            }
            if (newRight >= 0) {
                setRight(newRight);
            }
        };
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [top, left, right, bottom, windowSizes]);

    useEffect(() => {
        getDimensions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => save(), [save]);
    useEffect(() => {
        if (id) {
            const dataString = localStorage.getItem(localStorageKey(id));
            if (dataString) {
                const data = JSON.parse(dataString);

                if (data.right !== undefined && window.innerWidth - data.right - data.left < MIN_WIDTH) {
                    data.right = window.innerWidth - data.left - MIN_WIDTH;
                    if (data.right < 0) {
                        data.left += data.right;
                        data.right = 0;
                    }
                }

                if (data.bottom !== undefined && window.innerHeight - data.bottom - data.top < MIN_HEIGHT) {
                    data.bottom = window.innerWidth - data.top - MIN_HEIGHT;
                    if (data.bottom < 0) {
                        data.top += data.bottom;
                        data.bottom = 0;
                    }
                }

                setTop(data.top ?? 0);
                setLeft(data.left ?? 0);
                setRight(data.right);
                setBottom(data.bottom);
                setWindowState(data.windowState ?? 'normal');
            }
            setLoaded(true);
        }
    }, [id]);

    // Other

    const renderTitle = () => (
        <Clickable onMouseDown={onMoveStart} className={styles.fullWidth}>
            <Flex horizontal={true} className={styles.title}>
                <Grow className={styles.titleText}>
                    <Text>{title}</Text>
                </Grow>
                <InlineBlock className={styles.titleButtons}>
                    <Clickable onClick={toggleMinimized} className={styles.titleButton}>
                        <Icon icon={faWindowMinimize} />
                    </Clickable>
                    <Clickable onClick={toggleMaximized} className={styles.titleButton}>
                        <Icon icon={faWindowMaximize} />
                    </Clickable>
                    <Clickable onClick={openInNewWindow} className={styles.titleButton}>
                        <Icon icon={faWindowRestore} />
                    </Clickable>
                </InlineBlock>
            </Flex>
        </Clickable>
    );

    // Render Functions

    return (
        <Clickable onClick={onActive} onClickData={id} ref={containerRef}>
            <Flex
                ref={windowRef}
                className={classNames(styles.windowContainer, className, {
                    [styles.minimized]: windowState === 'minimized',
                    [styles.maximized]: windowState === 'maximized',
                    [styles.popup]: windowState === 'popup',
                    [styles.moving]: mouseDownPos,
                    [styles.active]: isActive,
                })}
                style={{ top, left, bottom, right, minWidth: MIN_WIDTH, minHeight: MIN_HEIGHT }}
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
                <Grow className={classNames(styles.fullWidth, styles.overflowContainer)}>
                    <Flex horizontal={true} className={classNames(styles.stretchItems, styles.fullHeight)}>
                        <Clickable
                            className={classNames(styles.resize, styles.x)}
                            onMouseDown={onResizeStart}
                            onMouseDownData="left"
                        />
                        <Grow className={styles.overflowContainer}>
                            <Block className={styles.window}>
                                {renderTitle()}
                                <Block className={styles.content} __allowChildren="all">
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
const WindowMemo = withMemo(Window, styles);
export { WindowMemo as Window };
