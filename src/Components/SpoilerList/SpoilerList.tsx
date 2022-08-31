import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { ReactElement } from 'react';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
import { Block } from '../Layout/Block';
import classNames from 'classnames';
import { Spoiler } from './Spoiler/Spoiler';
import { useSpoilerGroup } from './useSpoilerGroup';

export type SpoilerItem<BodyData, TitleData = string> = {
    title: TitleData;
    body: BodyData;
    key: number | string;
};

export type SpoilerListProps<BodyData, TitleData = string> = RbmComponentProps<
    {
        data: SpoilerItem<BodyData, TitleData>[];
        renderBody: (item: SpoilerItem<BodyData, TitleData>) => ReactElement;
        renderTitle?: (item: SpoilerItem<BodyData, TitleData>) => ReactElement | string;
    },
    WithNoChildren
>;

const stringIdentity = (data: any) => data as string;

function SpoilerList<BodyData, TitleData = string>({
    data,
    renderBody,
    renderTitle = stringIdentity,
    className,
    style,
}: SpoilerListProps<BodyData, TitleData>) {
    // Variables
    const [propsGenerator] = useSpoilerGroup();

    // Refs

    // States

    // Selectors

    // Callbacks

    // Effects

    // Other

    // Render Functions
    return (
        <Block className={classNames(className)} style={style}>
            {data.map((item) => (
                <Spoiler title={renderTitle(item)} {...propsGenerator(item.key)}>
                    {renderBody(item)}
                </Spoiler>
            ))}
        </Block>
    );
}

// Need SpoilerListMemo for autocompletion of phpstorm
const SpoilerListMemo = withMemo(SpoilerList);
export { SpoilerListMemo as SpoilerList };
