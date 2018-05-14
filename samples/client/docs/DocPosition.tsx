import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocNote, DocPage, DocSection} from "../comps/DocPage";


export class DocPosition extends DocPage{
    static title = 'Position';
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocNote>
                Position utilities are used for useful layout and position things, including clearfix, float,
                position and margin/padding utilities.
            </DocNote>
            <Code className="HTML">{E1}</Code>
        </DocSection>
    }
}

const E1 = `<!-- clear float -->
<div class="clearfix"></div>
<!-- float: left and right -->
<div class="float-left"></div>
<div class="float-right"></div>
<!-- position: relative, absolute and fixed -->
<div class="relative"></div>
<div class="absolute"></div>
<div class="fixed"></div>
<!-- centered block -->
<div class="centered"></div>

<!-- m-1 {margin: 4px;} m-2 {margin: 8px;} -->
<div class="m-1"></div>
<div class="m-2"></div>
<!-- margin in 4 directions. mt-1 {margin-top: 4px;} mt-2 {margin-top: 8px;} -->
<div class="mt-1"></div>
<div class="mt-2"></div>
<!-- mx-1 {margin-left: 4px; margin-right: 4px;} -->
<div class="mx-1"></div>
<div class="mx-2"></div>
<div class="my-1"></div>
<div class="my-2"></div>
<!-- p-1 {padding: 4px;} p-2 {padding: 8px;} -->
<div class="p-1"></div>
<div class="p-2"></div>
<!-- padding in 4 directions. pt-1 {padding-top: 4px;} pt-2 {padding-top: 8px;} -->
<div class="pt-1"></div>
<div class="pt-2"></div>
<!-- px-1 {padding-left: 4px; padding-right: 4px;} -->
<div class="px-1"></div>
<div class="px-2"></div>
<div class="py-1"></div>
<div class="py-2"></div>`;