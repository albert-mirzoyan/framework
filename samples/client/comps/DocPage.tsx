import * as React from "@barlus/nerv"
import { observer, store} from '@barlus/storex';
import { RoutesStore } from '../stores';
import { Code } from "./Code";
export class DocNavItem extends React.PureComponent<{ href: string, title: string }, {}>{
    render(){
        return <li className="menu-item">
            <a href={this.props.href}>{this.props.title}</a>
        </li>
    }
}
export class DocNavCategory extends React.PureComponent<{ active?: boolean, title: string }, {}>{
    render(){
        const active = this.props.active;
        const title = this.props.title;
        const children = this.props.children;
        const key = String(this.props.title).toLowerCase();
        const id = `docs-accordion-${key}`;
        return <div className="accordion" key={key}>
            <input type="checkbox" id={id} name="docs-accordion-checkbox" hidden defaultChecked={active}/>
            <label className="accordion-header c-hand" htmlFor={id}>{title}</label>
            <div className="accordion-body">
                <ul className="menu menu-nav">
                    {children}
                </ul>
            </div>
        </div>
    }
}
export class DocSection extends React.PureComponent<{ id: string, title: string }, {}> {
    render() {
        const { id, title, children } = this.props;
        const href = `#${id}`;
        return <div id={id} className="container">
            <h3 className="s-title">
                <a href={href} className="anchor" aria-hidden="true">#</a>
                {title}
            </h3>
            {children}
        </div>
    }
}
export class DocNote extends React.PureComponent<{}, {}> {
    render() {
        return <div className="docs-note">
            <p>{this.props.children}</p>
        </div>
    }
}
export class DocTitle extends React.PureComponent<{}, {}> {
    render() {
        return <h4 className="s-subtitle">{this.props.children}</h4>
    }
}
export class DocSample extends React.PureComponent<{ columns?: number }, {}> {
    static defaultProps = {
        columns: 1
    };
    render() {
        const col = `column col-${12 / this.props.columns}`;
        return <div className="columns">{
            React.Children.map(this.props.children, child => {
                return <div className={col}>{child}</div>
            })
        }</div>
    }
}
export class DocExample extends React.PureComponent<{ lang?: string, content: string | string[] }, {}> {
    static defaultProps = {
        lang: "HTML",
        content: ''
    };
    render() {
        return <Code className={this.props.lang}>{
            Array.isArray(this.props.content)
                ? this.props.content.join('\n')
                : this.props.content
        }</Code>
    }
}
export class DocPage<P={},S={}> extends React.PureComponent<P,S>{
    static get id(){
        return slug(this.name)
    }
    static get href(){
        return `/#/${slug(this.name)}`
    }
    get id(){
        return slug(this.constructor.name);
    }
    get title(){
        return this.constructor['title']||this.constructor.name;
    }
    get href(){
        return `/#/${this.id}`;
    }
    constructor(props,context){
        super(props,context);
    }
}
export class DocNavBar extends React.PureComponent<{docs}, {}> {
    render() {
        const {docs} = this.props;
        const category = (c,d) => {
            const href = `/#/${docs[ d ][ c ].id||docs[ d ][ c ].name}`;
            const title = docs[ d ][ c ].title || docs[ d ][ c ].name;
            return <DocNavItem href = {href} title = {title} />
        };
        const items = Object.keys(docs).map((d) => {
            return <DocNavCategory title={d} key={d} active>
                {Object.keys(docs[ d ]).map(c=>category(c,d))}
            </DocNavCategory>;
        });
        return <div id="sidebar" className="docs-sidebar off-canvas-sidebar">
            <div className="docs-brand">
                <a href="#" className="docs-logo">
                    <img src="https://picturepan2.github.io/spectre/img/spectre-logo.svg"
                         alt="Spectre.css CSS Framework"/>
                    <h2>SPECTRE</h2>
                </a>
            </div>
            <div className="docs-nav">
                <div className="accordion-container">
                    { items }
                </div>
            </div>
        </div>
    }
}

@observer
export class DocApp extends React.PureComponent<{docs}, {}> {

    @store router:RoutesStore;

    render() {
        const routeName = this.router.routerState.routeName;
        const {docs} = this.props;
        const components = [];
        Object.keys(docs).forEach(d => {
            Object.keys(docs[ d ]).forEach(c => {
                const Component = docs[d][c];
                if(Component.id==routeName || Component.name==routeName){
                    components.push(<Component/>)
                }
            })
        });
        return (
            <div className="docs-container off-canvas off-canvas-sidebar-show">
                <div className="docs-navbar">
                    <a className="off-canvas-toggle btn btn-link btn-action" href="#sidebar">
                        <i className="icon icon-menu"/>
                    </a>
                    <a href="https://github.com/picturepan2/spectre" target="_blank" className="btn btn-primary">GitHub</a>
                </div>
                <DocNavBar docs={this.props.docs}/>
                <a className="off-canvas-overlay" href="#close"/>
                <div id="content" className="docs-content off-canvas-content">
                    <a className="off-canvas-overlay" href="#close"/>
                    {components}
                </div>
            </div>
        );
    }
}
function slug(name:string){
    return name.replace(/([a-z])([A-Z])/m,'$1-$2').toLocaleLowerCase();
}