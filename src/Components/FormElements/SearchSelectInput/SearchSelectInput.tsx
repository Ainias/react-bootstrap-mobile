import * as React from 'react';
import { OptionalListener } from '../../Hooks/useListener';
import { SelectOption } from '../Select/Select';
import classNames from 'classnames';
import { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react';
import { ArrayHelper } from 'js-helper';
import { RbmComponentProps } from '../../RbmComponentProps';
import { withMemo } from '../../../helper/withMemo';
import { InlineBlock } from '../../Layout/InlineBlock';
import { Text, TEXT_SIZE } from '../../Text/Text';
import { Block } from '../../Layout/Block';

import styles from './seachSelectInput.scss';
import { Flex } from '../../Layout/Flex';
import { Grow } from '../../Layout/Grow';
import { Clickable } from '../../Clickable/Clickable';

export type SearchSelectInputProps<OnChangeData> = RbmComponentProps<
    {
        label?: string;
        options: SelectOption[];
        onChangeValue?: (newValues: string[]) => void;
        values: string[];
    } & OptionalListener<'onChange', OnChangeData>
>;

export const SearchSelectInput = withMemo(function SearchSelectInput<OnChangeData>({
    label,
    options,
    values,
    onChangeValue,
    className,
    style,
}: SearchSelectInputProps<OnChangeData>) {
    // Variables
    const indexedOptions = useMemo(() => ArrayHelper.arrayToObject(options, (opt) => opt.value), [options]);

    // Refs
    const containerRef = useRef<HTMLLabelElement>(null);

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
            (option) => !values.includes(option.value) && option.label.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [suggestionsPosition, options, searchText, values]);

    // Selectors

    // Callbacks
    const updateSuggestionPosition = useCallback(() => {
        if (!containerRef.current) {
            return;
        }
        const { left, right, bottom: top } = containerRef.current.getBoundingClientRect();
        setSuggestionsPosition({ top, left, right: window.innerWidth - right });
    }, []);

    const onChange = useCallback((ev) => {
        setSearchText(ev.target.value);
        setSelectedIndex(0);
    }, []);
    const onBlur = useCallback(() => setSuggestionsPosition(undefined), []);
    const onFocus = useCallback(() => updateSuggestionPosition(), [updateSuggestionPosition]);

    const toggleOption = useCallback(
        (_, value: string) => {
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
        },
        [onChangeValue, values]
    );

    const onKeyPress = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            console.log('Keypress', e.key);

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
    const renderOption = (value: string) => (
        <Clickable onClick={toggleOption} onClickData={value} key={indexedOptions[value].key}>
            <InlineBlock className={styles.tag}>
                <Text size={TEXT_SIZE.xSmall}>{indexedOptions[value].label}</Text>
            </InlineBlock>
        </Clickable>
    );
    const renderSelectableOption = (opt: SelectOption, index: number) => (
        <Clickable onClick={toggleOption} onClickData={opt.value} key={opt.key}>
            <Block className={classNames(styles.selectableOption, { [styles.active]: index === selectedIndex })}>
                <Text>{opt.label}</Text>
            </Block>
        </Clickable>
    );

    return (
        <label className={classNames(styles.input, className)} style={style} ref={containerRef}>
            {label ? <span className={styles.label}>{label}</span> : null}
            <Flex className={styles.inputContainer} horizontal={true}>
                <InlineBlock>{values.map(renderOption)}</InlineBlock>
                <Grow __allowChildren="html">
                    <input
                        className={styles.text}
                        value={searchText}
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyDown={onKeyPress}
                    />
                </Grow>
            </Flex>
            {selectableOptions.length > 0 && (
                <InlineBlock className={styles.selectableOptionContainer} style={suggestionsPosition}>
                    {selectableOptions.map(renderSelectableOption)}
                </InlineBlock>
            )}
        </label>
    );
},
styles);
