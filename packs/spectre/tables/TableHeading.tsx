import * as React from "@barlus/nerv";


export class TableHeading extends React.PureComponent<TableHeadingProps, {}> {
    render() {
        const {
            className,
            children,
            ...otherProps
        } = this.props;
        return <th  {...otherProps} class={className}>
        {children}
        </th >
    }
}

export interface TableHeadingProps {
    className?: string,
}