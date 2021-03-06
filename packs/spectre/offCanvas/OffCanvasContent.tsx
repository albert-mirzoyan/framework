import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class OffCanvasContent extends React.PureComponent<OffCanvasContentProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            active,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.content,className)}>
            {children}
        </div>)
    }
}

export interface OffCanvasContentProps {
    className?: string,
}