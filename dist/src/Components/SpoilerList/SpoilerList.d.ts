import * as React from 'react';
import { ReactElement } from 'react';
import { RbmComponentProps, WithNoChildren } from '../RbmComponentProps';
export type SpoilerItem<BodyData, TitleData = string> = {
    title: TitleData;
    body: BodyData;
    key: number | string;
};
export type SpoilerListProps<BodyData, TitleData = string> = RbmComponentProps<{
    data: SpoilerItem<BodyData, TitleData>[];
    renderBody: (item: SpoilerItem<BodyData, TitleData>) => ReactElement;
    renderTitle?: (item: SpoilerItem<BodyData, TitleData>) => ReactElement | string;
}, WithNoChildren>;
declare function SpoilerList<BodyData, TitleData = string>({ data, renderBody, renderTitle, className, style, }: SpoilerListProps<BodyData, TitleData>): React.JSX.Element;
declare const SpoilerListMemo: typeof SpoilerList;
export { SpoilerListMemo as SpoilerList };
