import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';


export class BarItem extends React.PureComponent<BarItemProps, {}> {
    render() {
        const {
            className,
            children,
            progress,
            style,
            ...otherProps
        } = this.props;
        const styles = { ...style, width: `${progress}%` };
        return <div {...otherProps}   role="progressbar"  style={styles} class={classes(Theme.BarItem, className)}>{children}</div>
    }
}

export interface BarItemProps {
    className?: string,
    progress?:number,

}