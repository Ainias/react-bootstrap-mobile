/// <reference types="react" />
import { RbmComponentProps } from '../../RbmComponentProps';
export type BulletListProps = RbmComponentProps<{
    numbered?: boolean;
}>;
declare function BulletList({ numbered, className, children, style }: BulletListProps): JSX.Element;
declare const BulletListMemo: typeof BulletList;
export { BulletListMemo as BulletList };
