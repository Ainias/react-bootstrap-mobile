import React, { useCallback } from 'react';
import { FormProvider, FormProviderProps } from "react-hook-form";
import { withMemo } from "../../../helper/withMemo";
import { LoadingArea } from "../../LoadingArea/LoadingArea";
import { SendFormContext } from "./SendFormContext";

type FieldValues = Record<string, any>;
export type HookFormProps<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined> =
    FormProviderProps<TFieldValues, TContext, TTransformedValues>
    & {
    onSend?: () => void;
};

export const HookForm = withMemo(function HookForm<TFieldValues extends FieldValues = FieldValues, TContext = any, TTransformedValues extends FieldValues | undefined = undefined>({
                                                                                                                                                                                       children,
                                                                                                                                                                                       onSend,
                                                                                                                                                                                       ...methods
                                                                                                                                                                                   }: HookFormProps<TFieldValues, TContext, TTransformedValues>) {
    // Refs

    // States/Variables/Selectors

    // Create an inner, as the onSend may have other attributes
    const innerOnSend = useCallback(() => onSend?.(), [onSend]);

    // Dispatch

    // Callbacks

    // Effects

    // Other

    // RenderFunctions

    return <FormProvider {...methods}>
        <SendFormContext.Provider value={innerOnSend}>
            <LoadingArea loading={methods.formState.isSubmitting} __allowChildren="all">
                {children}
            </LoadingArea>
        </SendFormContext.Provider>
    </FormProvider>;
});
