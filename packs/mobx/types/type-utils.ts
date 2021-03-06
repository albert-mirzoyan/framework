import { IDepTreeNode } from "../core/observable"
import { isProduction } from '../env';
import { fail } from "../utils/utils"
import { initializeInstance } from "../utils/decorators2"
import { isAtom } from "../core/atom"
import { isComputedValue } from "../core/computedvalue"
import { isReaction } from "../core/reaction"
import { isObservableArray } from "./observablearray"
import { isObservableMap } from "./observablemap"
import { isObservableObject } from "./observableobject"

export function getAtom(thing: any, property?: string): IDepTreeNode {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray(thing)) {
            if (property !== undefined) {
                fail(
                    !isProduction &&
                    "It is not possible to get index atoms from arrays"
                );
            }
            return (thing as any).$mobx.atom
        }
        if (isObservableMap(thing)) {
            const anyThing = thing as any;
            if (property === undefined) {
                return getAtom(anyThing._keys);
            }
            const observable = anyThing._data.get(property) || anyThing._hasMap.get(property);
            if (!observable) {
                fail(
                    !isProduction &&
                    `the entry '${property}' does not exist in the observable map '${getDebugName(thing)}'`
                );
            }
            return observable
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance(thing);
        if (property && !thing.$mobx) {
            thing[ property ];
        } // See #1072
        if (isObservableObject(thing)) {
            if (!property) {
                return fail(!isProduction && `please specify a property`);
            }
            const observable = (thing as any).$mobx.values[ property ];
            if (!observable) {
                fail(
                    !isProduction &&
                    `no observable property '${property}' found on the observable object '${getDebugName(
                        thing
                    )}'`
                );
            }
            return observable
        }
        if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
            return thing
        }
    } else if (typeof thing === "function") {
        if (isReaction(thing.$mobx)) {
            // disposer function
            return thing.$mobx
        }
    }
    return fail(!isProduction && "Cannot obtain atom from " + thing)
}

export function getAdministration(thing: any, property?: string) {
    if (!thing) {
        fail("Expecting some object");
    }
    if (property !== undefined) {
        return getAdministration(getAtom(thing, property));
    }
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
        return thing;
    }
    if (isObservableMap(thing)) {
        return thing;
    }
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance(thing);
    if (thing.$mobx) {
        return thing.$mobx;
    }
    fail(!isProduction && "Cannot obtain administration from " + thing)
}

export function getDebugName(thing: any, property?: string): string {
    let named;
    if (property !== undefined) {
        named = getAtom(thing, property);
    } else if (isObservableObject(thing) || isObservableMap(thing)) {
        named = getAdministration(thing);
    } else {
        named = getAtom(thing);
    } // valid for arrays as well
    return named.name
}
