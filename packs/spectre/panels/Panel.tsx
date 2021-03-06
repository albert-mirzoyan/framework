import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Panel extends React.PureComponent<PanelProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.Panel,className)}>
            {children}
        </div>)
    }
}

export interface PanelProps {
    className?: string,
}