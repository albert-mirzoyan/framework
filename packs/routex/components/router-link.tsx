import * as React from '@barlus/nerv';
import { inject } from '@barlus/storex';
import { RouterState, StringMap } from '../router-store';
import { routerStateToUrl } from '../adapters/generate-url';

function isLeftClickEvent(event: MouseEvent) {
    return event.button === 0;
}

function isModifiedEvent(event: MouseEvent) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export interface RouterLinkProps {
    rootStore: any;
    routeName: string;
    params?: StringMap;
    queryParams?: Object;
    className?: string;
    activeClassName?: string;
}

/**
 * Creates an anchor tag that links to a router state. Redirects to the target
 * state without reloading the entire app, thus avoiding potential flickers.
 *
 * Example:
 *     <RouterLink routeName="home">
 *         Home
 *     </RouterLink>
 *
 * Note that `rootStore` is injected directly into the RouterLink, there
 * is no need to pass it as prop.
 *
 * The target state is specified by the `routeName`, `params` and `queryParams`
 * properties.
 *
 * RouterLink accepts `className` and `activeClassName` as optional
 * properties. `className` is always applied to the anchor tag.
 * `activeClassName` is applied in addition if the current `routerState`
 * matches the state specified by the `RouterLink`. This feature is
 * useful for highlighting the active link in a navbar.
 */
@inject('rootStore')
export class RouterLink extends React.Component<RouterLinkProps, {}> {
    render() {
        const {
            rootStore: { routerStore },
            routeName,
            params,
            queryParams,
            className,
            activeClassName,
            children
        } = this.props;

        const toState = new RouterState(routeName, params, queryParams);

        const isActive = routerStore.routerState.isEqual(toState);
        const joinedClassName =
            (className ? className : '') +
            (isActive && activeClassName ? ' ' + activeClassName : '');

        return (
            <a
                className={joinedClassName}
                href={routerStateToUrl(routerStore, toState)}
                onClick={this.handleClick}
            >
                {children}
            </a>
        );
    }

    handleClick = (event: MouseEvent) => {
        // Ignore if link is clicked using a modifier key or not left-clicked
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return undefined;
        }

        // Prevent default action which reloads the app
        event.preventDefault();

        // Change the router state to trigger a refresh
        const { rootStore, routeName, params, queryParams } = this.props;
        const { routerStore } = rootStore;
        return routerStore.goTo(routeName, params, queryParams);
    };
}
