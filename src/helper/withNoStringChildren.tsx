import React, { ComponentType, ForwardedRef, ReactNode } from 'react';
import { RbmComponentProps } from '../Components/RbmComponentProps';
import { RefComponent } from './withForwardRef';
import { Clickable, ClickableProps } from '../Components/Clickable/Clickable';

type Child = JSX.Element | undefined | null | Child[];
type WithNoStringProps<Props> = (
    | {
          children?: Child;
          allowAllChildren?: false;
      }
    | {
          children?: ReactNode;
          allowAllChildren: true;
      }
) &
    Props;

export function withNoStringChildren<C extends ComponentType>(Component: C) {
    type RefType = React.ComponentRef<C>;
    type Props = React.ComponentProps<C>;
    type HocProps = WithNoStringProps<Props>;
    const hocComponent = (props: HocProps, ref?: ForwardedRef<RefType>) => {
        const { children, ...otherProps } = props;

        // TODO check wether children are strings or not

        return (
            <Component {...(otherProps as Props)} ref={ref}>
                {children}
            </Component>
        );
    };
    hocComponent.displayName = `WithNoStringChildren(${Component.displayName || Component.name})`;
    return hocComponent;
}
