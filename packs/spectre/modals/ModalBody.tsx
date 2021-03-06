import * as React from "@barlus/nerv";
import { Theme } from './theme';
import { classes } from '../utils/classes';

export class ModalBody extends React.PureComponent<ModalBodyProps, {}> {
    render() {
        const {
            className,
            // Styles.
            children,
            ...otherProps
        } = this.props;
        return (<div {...otherProps} class={classes(Theme.modalBody,className)}>
            {children}
        </div>)
    }
}

export interface ModalBodyProps {
    className?: string,
}