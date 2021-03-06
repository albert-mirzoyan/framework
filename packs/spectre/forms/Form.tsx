import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Form extends React.PureComponent<FormProps, {}> {
    render() {
        const {
            className,
            // Styles.
            horizontal,
            children,
            ...otherProps
        } = this.props;
        return <form {...otherProps} class={
            classes({
                [ Theme.horizontal ]: horizontal,
            }, className)
        }>{children}</form>
    }
}

export interface FormProps {
    className?: string,
    horizontal?:boolean
}