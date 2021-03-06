import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {FormGroup} from "./FormGroup";

export class TextArea extends React.PureComponent<TextAreaProps, {}> {
    render() {
        const {
            className,
            // Styles.
            label,
            success,
            error,
            id,
            children,
            ...otherProps
        } = this.props;
        const formGroupProps = { label, id };
        const inputProps = { id, ...otherProps };
        return <FormGroup {...formGroupProps}>
            <textarea {...inputProps} class={
                classes(Theme.input, {
                    [ Theme.success ]: success,
                    [ Theme.error ]: error,
                }, className)
            }>
                {children}
            </textarea>
        </FormGroup>
    }
}

export interface TextAreaProps {
    className?: string,
    success?:boolean
    error?:boolean
    label?:string,
    id?:string,
}