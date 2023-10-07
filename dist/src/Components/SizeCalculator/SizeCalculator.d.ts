import * as React from 'react';
import { WithNoStringAndChildrenProps } from '../RbmComponentProps';
export type SizeCalculatorProps = {
    onSize: (width: number, height: number) => void;
    absolute?: boolean;
} & WithNoStringAndChildrenProps;
declare function SizeCalculator({ onSize, children, absolute }: SizeCalculatorProps): React.JSX.Element;
declare const SizeCalculatorMemo: typeof SizeCalculator;
export { SizeCalculatorMemo as SizeCalculator };
