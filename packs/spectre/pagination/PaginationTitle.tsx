import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class PaginationTitle extends React.PureComponent<PaginationTitleProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.paginationTitle,className)}>
            {children}
        </div>)
    }
}

export interface PaginationTitleProps {
    className?: string,
}