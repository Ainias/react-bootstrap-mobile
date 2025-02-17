import React from 'react';
import { withMemo } from "../../helper/withMemo";
import styles from "./formError.scss";
import { Text } from "../Text/Text";
import { Block } from "../Layout/Block";

export type FormErrorProps = {error?: string};

export const FormError = withMemo(function FormError({error}: FormErrorProps) {
    // Refs

    // States/Variables/Selectors

    // Dispatch

    // Callbacks

    // Effects

    // Other

    // RenderFunctions

	if (!error){
		return null;
	}

	return <Block className={styles.error}><Text>{error}</Text></Block>
}, styles);
