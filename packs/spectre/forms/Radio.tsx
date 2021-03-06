import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';
import {FormGroup} from "./FormGroup";
import {Label} from "./Label";

export class Radio extends React.Component<RadioProps, {}> {
    render() {
        const {
            className,
            // Styles.
            label,
            success,
            error,
            // sizing
            small,
            large,
            id,
            children,
            ...otherProps
        } = this.props;

        return <Label className={
            classes(Theme.radio, {
                [ Theme.inputSm ]: small,
                [ Theme.inputLg ]: large,
                [ Theme.success ]: success,
                [ Theme.error ]: error,
            }, className)
            }>
                <input {...otherProps} type="radio"/>
                <i class={classes(Theme.icon)} />
            {label}
        </Label>

    }
}

export interface RadioProps {
    className?: string,
    success?:boolean,
    error?:boolean,
    label?:string,
    small?:boolean,
    large?:boolean,
}