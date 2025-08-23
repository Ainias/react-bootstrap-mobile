import React, {
    ComponentProps,
    ComponentRef,
    ComponentType, ForwardedRef,
    useCallback
} from "react";
import { FieldPath, FieldValues, useController, useFormContext } from "react-hook-form";
import { useComposedRef } from "../../Hooks/useComposedRef";
import { withMemo } from "../../../helper/withMemo";

export function withHookController<C extends ComponentType<any>, OnChangeProp extends keyof ComponentProps<C>>(Comp: C, onChangeProp: OnChangeProp, emptyValue: any = null) {
    type RefType = ComponentRef<C>;
    type OldProps = ComponentProps<C>;

    type Props<Values extends FieldValues, Name extends FieldPath<Values> = FieldPath<Values>> = Omit<
        OldProps,
        'name' | 'onBlur' | OnChangeProp | 'value'
    > & { name: Name };

    function WithHookComponent<Values extends FieldValues, Name extends FieldPath<Values> = FieldPath<Values>>(
        {name, ref, ...otherProps}: Props<Values, Name> & {ref?: ForwardedRef<RefType>},
    ) {
        const children = "children" in otherProps ? otherProps.children : undefined;

        const {field, fieldState} = useController({name});
        const {clearErrors} = useFormContext();
        const composedRef = useComposedRef(ref, field.ref);
        const errorMessage = fieldState.error?.message;

        const internalOnChange = useCallback(
            (arg: any) => {
                clearErrors(name);
                field.onChange(arg);
            },
            [clearErrors, field, name]
        );
        const onChangeProps = {
            [onChangeProp]: internalOnChange
        };

        return (
            // @ts-expect-error Because of the prop spreading, typescript is really confused here
            <Comp
                {...otherProps}
                name={field.name}
                onBlur={field.onBlur}
                disabled={field.disabled}
                {...onChangeProps}
                value={field.value ?? emptyValue}
                checked={field.value ?? emptyValue}
                ref={composedRef}
                error={errorMessage}
            >
                {children}
            </Comp>
        );
    }

    return withMemo(WithHookComponent);
}
