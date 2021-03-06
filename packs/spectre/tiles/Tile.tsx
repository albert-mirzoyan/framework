import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Tile extends React.PureComponent<TileProps, {}> {
    render() {
        const {
            className,
            // Styles.
            centered,
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.Tile, {[Theme.centered]:centered},className)}>
            {children}
        </div>)
    }
}

export interface TileProps {
    className?: string,
    centered?: boolean
}