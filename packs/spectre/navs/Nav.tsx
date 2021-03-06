import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class Nav extends React.PureComponent<NavProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<ul {...otherProps} class={classes(Theme.Nav,className)}>
            {children}
        </ul>)
    }
}

export interface NavProps {
    className?: string,
}