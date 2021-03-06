import { isProduction } from '../env';
import { fail, Lambda } from "../utils/utils"
import { IObservableArray, isObservableArray } from "../types/observablearray"
import { isObservableMap, ObservableMap } from "../types/observablemap"
import { isObservableObject } from "../types/observableobject"
import { IObservableValue, isObservableValue } from "../types/observablevalue"
import { getAdministration } from "../types/type-utils"

export type ReadInterceptor<T> = (value: any) => T

/** Experimental feature right now, tested indirectly via Mobx-State-Tree */
export function interceptReads<T>(value: IObservableValue<T>, handler: ReadInterceptor<T>): Lambda
export function interceptReads<T>(
    observableArray: IObservableArray<T>,
    handler: ReadInterceptor<T>
): Lambda
export function interceptReads<K, V>(
    observableMap: ObservableMap<K, V>,
    handler: ReadInterceptor<V>
): Lambda
export function interceptReads(
    object: Object,
    property: string,
    handler: ReadInterceptor<any>
): Lambda
export function interceptReads(thing, propOrHandler?, handler?): Lambda {
    let target;
    if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
        target = getAdministration(thing)
    } else if (isObservableObject(thing)) {
        if (typeof propOrHandler !== "string") {
            return fail(!isProduction &&
                `InterceptReads can only be used with a specific property, not with an object in general`
            )
        }
        target = getAdministration(thing, propOrHandler)
    } else {
        return fail(
            !isProduction &&
            `Expected observable map, object or array as first array`
        )
    }
    if (target.dehancer !== undefined) {
        return fail(
            !isProduction && `An intercept reader was already established`
        )
    }
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return () => {
        target.dehancer = undefined
    }
}
