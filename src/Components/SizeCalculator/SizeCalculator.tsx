import * as React from 'react';
import { withMemo } from '../../helper/withMemo';
import { WithNoStringAndChildrenProps } from '../RbmComponentProps';
import { InlineBlock } from '../Layout/InlineBlock';
import { useEffect, useRef } from 'react';

export type SizeCalculatorProps = {
    onSize: (width: number, height: number) => void;
    absolute?: boolean;
} & WithNoStringAndChildrenProps;

function SizeCalculator({ onSize, children, absolute = false }: SizeCalculatorProps) {
    // Variables

    // Refs
    const ref = useRef<HTMLSpanElement>(null);

    // States

    // Selectors

    // Callbacks

    // Effects
    useEffect(() => {
        if (!ref.current) {
            return;
        }
        onSize(ref.current.clientWidth, ref.current.clientHeight);
    }, [onSize]);

    // Other

    // Render Functions

    return (
        <InlineBlock ref={ref} __allowChildren="all" style={{ position: absolute ? 'absolute' : 'static' }}>
            {children}
        </InlineBlock>
    );
}

// Need SizeCalculatorMemo for autocompletion of phpstorm
const SizeCalculatorMemo = withMemo(SizeCalculator);
export { SizeCalculatorMemo as SizeCalculator };
