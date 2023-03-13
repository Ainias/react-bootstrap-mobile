/// <reference types="react" />
import { RbmComponentProps } from '../../RbmComponentProps';
import { EmptyProps } from '../../../helper/EmptyProps';
export type ListItemProps = RbmComponentProps<EmptyProps>;
declare function ListItem({ className, children, style }: ListItemProps): JSX.Element;
declare const ListItemMemo: typeof ListItem;
export { ListItemMemo as ListItem };
