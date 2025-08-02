import * as React from 'react';
import { OptionalListener } from '../../Hooks/useListener';
import { SelectOption } from '../Select/Select';
import classNames from 'classnames';
import { ChangeEventHandler, KeyboardEvent, ReactNode, useCallback, useMemo, useRef, useState } from 'react';
import { ArrayHelper } from '@ainias42/js-helper';
import { RbmComponentProps } from '../../RbmComponentProps';
import { withMemo } from '../../../helper/withMemo';
import { InlineBlock } from '../../Layout/InlineBlock';
import { Text, TEXT_SIZE } from '../../Text/Text';
import { Block } from '../../Layout/Block';

import styles from './seachSelectInput.scss';
import { Flex } from '../../Layout/Flex';
import { Grow } from '../../Layout/Grow';
import { Clickable } from '../../Clickable/Clickable';
import { useWindow } from '../../../WindowContext/WindowContext';

export type SearchSelectInputProps<OnChangeData> = RbmComponentProps<
    {
        label?: string;
        options: SelectOption[];
        onChangeValue?: (newValues: string[]) => void;
        values: string[];
        renderSelectableOptions?: (option: SelectOption, isActive: boolean, index: number, activeIndex: number) => ReactNode,
        renderSelectedOption?: (option: SelectOption) => ReactNode,
        showSelectedOptions?: boolean;
        closeOnSelect?: boolean;
        enableSearch?: boolean;
        allowDeselect?: boolean;
    } & OptionalListener<'onChange', OnChangeData>
>;

export const SearchSelectInput = withMemo(function SearchSelectInput<OnChangeData>({
                                                                                       label,
                                                                                       options,
                                                                                       values,
                                                                                       onChangeValue,
                                                                                       className,
                                                                                       renderSelectableOptions,
                                                                                       renderSelectedOption,
                                                                                       showSelectedOptions = false,
                                                                                       closeOnSelect = false,
                                                                                       enableSearch = true,
    allowDeselect = true,
                                                                                       style,
                                                                                   }: SearchSelectInputProps<OnChangeData>) {
        // Variables
        const indexedOptions = useMemo(() => ArrayHelper.arrayToObject(options, (opt) => opt.value), [options]);

        // Refs
        const containerRef = useRef<HTMLLabelElement>(null);
        const inputRef = useRef<HTMLInputElement>(null);
        const window = useWindow();

        // States
        const [searchText, setSearchText] = useState('');
        const [suggestionsPosition, setSuggestionsPosition] = useState<
            { top: number; left: number; right: number } | undefined
        >(undefined);

        const [selectedIndex, setSelectedIndex] = useState(0);

        const selectableOptions = useMemo(() => {
            if (!suggestionsPosition) {
                return [];
            }
            return options.filter(
                (option) => (showSelectedOptions || !values.includes(option.value)) && (!enableSearch || option.label.toLowerCase().includes(searchText.toLowerCase()))
            );
        }, [suggestionsPosition, options, showSelectedOptions, values, enableSearch, searchText]);

        // Selectors

        // Callbacks
        const updateSuggestionPosition = useCallback(() => {
            if (!containerRef.current) {
                return;
            }
            const {left, right, bottom: top} = containerRef.current.getBoundingClientRect();
            setSuggestionsPosition({top, left, right: (window?.innerWidth ?? 0) - right});
        }, [window?.innerWidth]);

        const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((ev) => {
            if (!enableSearch){
                return;
            }
            setSearchText(ev.target.value);
            setSelectedIndex(0);
        }, [enableSearch]);
        const onFocus = useCallback(() => updateSuggestionPosition(), [updateSuggestionPosition]);

        const toggleOption = useCallback(
            (_: any, value: string) => {
                const newValues = [...values];
                const index = values.indexOf(value);
                if (index === -1) {
                    newValues.push(value);
                } else {
                    newValues.splice(index, 1);
                }
                setSearchText('');
                setSelectedIndex(0);
                onChangeValue?.(newValues);
                if (closeOnSelect) {
                    if (containerRef.current?.contains(document.activeElement)) {
                        inputRef.current?.focus();
                        requestAnimationFrame(() => {
                            inputRef.current?.blur();
                        });
                    }
                }
            },
            [closeOnSelect, onChangeValue, values]
        );

        const onKeyPress = useCallback(
            (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter' && !e.defaultPrevented) {
                    if (selectedIndex < selectableOptions.length) {
                        toggleOption(undefined, selectableOptions[selectedIndex].value);
                    }
                } else if (e.key === 'ArrowDown') {
                    setSelectedIndex((old) => {
                        if (old + 1 >= selectableOptions.length) {
                            return 0;
                        }
                        return old + 1;
                    });
                } else if (e.key === 'ArrowUp') {
                    setSelectedIndex((old) => {
                        if (old - 1 < 0) {
                            return Math.max(selectableOptions.length - 1, 0);
                        }
                        return old - 1;
                    });
                }
            },
            [toggleOption, selectableOptions, selectedIndex]
        );

        // Effects

        // Other

        // Render Functions
        const renderOption = (value: string) => {
            const option = indexedOptions[value];
            if (!option) {
                return null;
            }

            const element = renderSelectedOption?.(option) ?? <InlineBlock className={styles.tag}>
                <Text size={TEXT_SIZE.xSmall}>{indexedOptions[value]?.label}</Text>
            </InlineBlock>;

            const onClickProps = allowDeselect ? {onClick: toggleOption, onClickData: value} : {};

            return (
                <Clickable {...onClickProps} key={option.key} __allowChildren="all">
                    {element}
                </Clickable>
            );
        };
        const renderSelectableOption = (opt: SelectOption, index: number) => {
            const isActive = index === selectedIndex;
            const element = renderSelectableOptions?.(opt, isActive, index, selectedIndex) ?? (
                <Block className={classNames(styles.selectableOption, {[styles.active]: index === selectedIndex})}>
                    <Text>{opt.label}</Text>
                </Block>);

            return <Clickable onClick={toggleOption} onClickData={opt.value} key={opt.key} __allowChildren="all">
                {element}
            </Clickable>;
        };

        return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label className={classNames(styles.input, className)} style={style} ref={containerRef}>
                {label ? <span className={styles.label}>{label}</span> : null}
                <Flex className={styles.inputContainer} horizontal={true}>
                    <InlineBlock>{values.map(renderOption)}</InlineBlock>
                    <Grow __allowChildren="html">
                        <input
                            ref={inputRef}
                            className={classNames(styles.text, {[styles.disabled]: !enableSearch})}
                            value={searchText}
                            onChange={onChange}
                            onKeyDown={onKeyPress}
                            onFocus={onFocus}
                        />
                    </Grow>
                </Flex>
                <InlineBlock className={styles.selectableOptionContainer} style={suggestionsPosition}>
                    {selectableOptions.map(renderSelectableOption)}
                </InlineBlock>
            </label>
        );
    },
    styles);
