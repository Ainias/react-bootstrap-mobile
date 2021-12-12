/// <reference types="react" />
import { RbmComponentProps } from '../RbmComponentProps';
import { Override } from '../TypeHelpers';
import { RowProps } from 'react-bootstrap';
export declare type ColumnsProps = RbmComponentProps<Override<RowProps, {}>>;
declare function Columns({ className, children, ...rowProps }: ColumnsProps): JSX.Element;
declare const tmp: typeof Columns;
export { tmp as Columns };
