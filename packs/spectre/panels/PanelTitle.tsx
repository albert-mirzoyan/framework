import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PanelTitle extends React.PureComponent<PanelTitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.title,className)}>
            {children}
        </div>)
    }
}

export interface PanelTitleProps {
    className?: string,
}