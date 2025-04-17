import { FileInput, FileInputProps } from "../Input/FileInput/FileInput";
import React, { useCallback } from "react";
import { FieldPath, FieldValues, useController, useFormContext, useFormState } from "react-hook-form";
import { FileType } from "../Input/FileInput/FileType";
import { withMemo } from "../../../helper/withMemo";


type Props<Values extends FieldValues, Name extends FieldPath<Values> = FieldPath<Values>> = Omit<
    FileInputProps<unknown>,
    'name' | 'onBlur' | 'ref' | 'value' | "__allowChildren" | "children"|"onChangeFile"|"error"
> & { name: Name };

export const FileInputController = withMemo(function FileInputController<Values extends FieldValues, Name extends FieldPath<Values> = FieldPath<Values>>(
    {name, ...otherProps}: Props<Values, Name>,
) {
    const {field, fieldState} = useController({name});
    const {errors} = useFormState();

    const {clearErrors, setError} = useFormContext();
    const errorMessage = fieldState.error?.message ?? errors[`${name}.src`]?.message as string|undefined ?? errors[`${name}.name`]?.message as string|undefined ?? errors[`${name}.type`]?.message as string|undefined;

    const internalOnChange = useCallback(
        (arg: FileType | undefined) => {
            clearErrors(name);
            clearErrors(`${name}.name`);
            clearErrors(`${name}.src`);
            clearErrors(`${name}.type`);
            field.onChange(arg);
        },
        [clearErrors, field, name]
    );

    const setErrorMessage = useCallback((error: string) => {
        setError(name, {
            message: error,
        })
    }, []);

    return (
        <FileInput
            {...otherProps}
            {...field}
            onChangeFile={internalOnChange}
            onError={setErrorMessage}
            value={field.value}
            error={errorMessage}
        />
    );
});
