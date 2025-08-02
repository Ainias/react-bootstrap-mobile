import { useCallback } from 'react';
import { AnyObject, InferType, Maybe, ObjectSchema, ValidationError } from 'yup';

// TODO set translate function from somewhere else
export function useYupResolver<ObjectType extends Maybe<AnyObject>>(validationSchema: ObjectSchema<ObjectType>, translate: (key: string, args?: Record<string, string | number>) => string) {

    return useCallback(
        async (data: InferType<ObjectSchema<ObjectType>>) => {
            try {
                const values = await validationSchema.validate(data, {
                    abortEarly: false,
                });

                return {
                    values,
                    errors: {},
                };
            } catch (errors) {
                const reducedErrors = (errors.inner as ValidationError[]).reduce(
                    (allErrors, currentError) => {
                        if (currentError.path === undefined) {
                            return allErrors;
                        }

                        let message = currentError.message as
                            | string
                            | {
                            key: string;
                            args?: Record<string, string | number>;
                        };
                        if (typeof message === 'object') {
                            message = translate(message.key, message.args);
                        } else {
                            message = translate(message);
                        }
                        allErrors[currentError.path] = {
                            type: currentError.type ?? 'validation',
                            message,
                        };
                        return allErrors;
                    },
                    {} as Record<string, { type: string; message: string }>,
                );

                return {
                    values: {},
                    errors: reducedErrors,
                };
            }
        },
        [translate, validationSchema],
    );
}
