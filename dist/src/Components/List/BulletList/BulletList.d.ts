/// <reference types="react" />
import { RbmComponentProps } from '../../RbmComponentProps';
export declare type BulletListProps = RbmComponentProps<{
    numbered?: boolean;
}>;
declare function BulletList({ numbered, className, children }: BulletListProps): JSX.Element;
declare const BulletListMemo: typeof BulletList;
export { BulletListMemo as BulletList };
