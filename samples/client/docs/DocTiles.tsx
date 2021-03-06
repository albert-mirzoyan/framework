import * as React from "@barlus/nerv"
import { Code } from "../comps/Code";
import {DocExample, DocNote, DocPage, DocSample, DocSection, DocText, DocTitle} from "../comps/DocPage";
import {
    Avatar, Button, Column,
    Tile, TileAction, TileContent, TileIcon, TileSubtitle, TileTitle
} from "@barlus/spectre";

export class DocTiles extends DocPage{
    static title = "Tiles";
    render() {
        return <DocSection id={this.id} title={this.title}>
            <DocText text='Tiles are repeatable or embeddable information blocks.'/>
            <DocSample >
                <Column all={9}>
                    <Tile>
                        <TileIcon>
                            <Avatar lg src="https://picturepan2.github.io/spectre/img/avatar-3.png"/>
                        </TileIcon>
                        <TileContent>
                            <TileTitle>The Avengers</TileTitle>
                            <TileSubtitle>
                                Earth's Mightiest Heroes joined forces to take on threats
                                that were too big for any one hero to tackle...
                            </TileSubtitle>
                        </TileContent>
                        <TileAction>
                            <Button primary>Join</Button>
                            <Button >Contact</Button>
                        </TileAction>
                    </Tile>
                    <Tile>
                        <TileIcon>
                            <Avatar lg src="https://picturepan2.github.io/spectre/img/avatar-2.png"/>
                        </TileIcon>
                        <TileContent>
                            <TileTitle>The S.H.I.E.L.D.</TileTitle>
                            <TileSubtitle>
                                The Strategic Homeland Intervention,
                                Enforcement, and Logistics Division..
                            </TileSubtitle>
                            <Button small primary>Join</Button>
                            <Button small>Contact</Button>
                        </TileContent>
                    </Tile>
                </Column>
            </DocSample>
            <DocText text={`
                Use the container component ~Tile~. And add child elements with the
                ~TileIcon~, ~TileContent~ or/and ~TileAction~ components.
                The ~TileIcon~ and ~TileAction~ are optional.


                There are ~TileTitle~ and ~TileSubtitle~ components for title and
                subtitle text styles.
            `}/>

            <DocExample content={`
                <Tile>
                    <TileIcon>
                        <Avatar lg src="https://picturepan2.github.io/spectre/img/avatar-3.png"/>
                    </TileIcon>
                    <TileContent>
                        <TileTitle>The Avengers</TileTitle>
                        <TileSubtitle>
                            Earth's Mightiest Heroes joined forces to take on threats
                            that were too big for any one hero to tackle...
                        </TileSubtitle>
                    </TileContent>
                    <TileAction>
                        <Button primary>Join</Button>
                        <Button >Contact</Button>
                    </TileAction>
                </Tile>
            `}/>
            <DocTitle>Compact tiles</DocTitle>
            <DocText text={`
                There is compact version of ~Tiles~ component, which is often used as contact and file info
                blocks.
                Add the ~centered~ attribute to the container ~Tile~. The
                ~TileIcon~, ~TileContent~ and ~TileAction~ will be vertically centered.
            `}/>
            <DocSample>
                <Column all={6}>
                    <Tile centered>
                        <TileIcon>
                            <i className="icon icon-mail centered"/>
                        </TileIcon>
                        <TileContent>
                            <TileTitle>spectre-docs.pdf</TileTitle>
                            <TileSubtitle>14MB · Public · 1 Jan, 2017</TileSubtitle>
                        </TileContent>
                        <TileAction>
                            <Button link action><i className="icon icon-more-vert"/></Button>
                        </TileAction>
                    </Tile>
                </Column>
            </DocSample>
            <DocExample content={`
                <Tile centered>
                    <TileIcon>
                        <i className="icon icon-mail centered"/>
                    </TileIcon>
                    <TileContent>
                        <TileTitle>spectre-docs.pdf</TileTitle>
                        <TileSubtitle>14MB · Public · 1 Jan, 2017</TileSubtitle>
                    </TileContent>
                    <TileAction>
                        <Button link action><i className="icon icon-more-vert"/></Button>
                    </TileAction>
                </Tile>

            `}/>
        </DocSection>
    }
}


const E1 = `<div class="tile">
  <div class="tile-icon">
    <div class="example-tile-icon">
      <i class="icon icon-file centered"></i>
    </div>
  </div>
  <div class="tile-content">
    <p class="tile-title">The Avengers</p>
    <p class="tile-subtitle text-gray">Earth's Mightiest Heroes joined forces to take on threats that were too big for any one hero to tackle...</p>
  </div>
  <div class="tile-action">
    <button class="btn btn-primary">Join</button>
  </div>
</div>`;
const E2 = `<div class="tile tile-centered">
  <div class="tile-icon">
    <div class="example-tile-icon">
      <i class="icon icon-file centered"></i>
    </div>
  </div>
  <div class="tile-content">
    <div class="tile-title">spectre-docs.pdf</div>
    <div class="tile-subtitle text-gray">14MB · Public · 1 Jan, 2017</div>
  </div>
  <div class="tile-action">
    <button class="btn btn-link">
      <i class="icon icon-more-vert"></i>
    </button>
  </div>
</div>`;
