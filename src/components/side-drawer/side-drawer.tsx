import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
    tag : 'sp-side-drawer',
    styleUrl : './side-drawer.css',
    shadow: true
})

export class SideDrawer {
    @State() showContactInfo = false
    @Prop({reflectToAttr: true}) title: string;
    @Prop({reflectToAttr: true, mutable: true}) open: boolean;

    onCloseDrawer(){
        this.open = false
    }

    @Method() openIt(){
            this.open = true
    }

    onContentChange(content: string){
        this.showContactInfo = content === 'contact';     
    }

    render() {
        let mainContent = <slot/> ;
        if(this.showContactInfo){
            mainContent = (
                <div id="contact-information">
                    <h2> Contact Information</h2>
                    <p> You can reach us via phone and email</p>
                    <ul>
                        <li>Phone: <a href="tel:9999999999">9999999999</a></li>
                        <li>Email <a href="mailto:something@nothing.com">something@nothing.com</a></li>
                    </ul>
                </div>
            );

        }
        
        return(
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button class='close' onClick={this.onCloseDrawer.bind(this)}> X </button>
                </header>
                <section id="tabs">
                    <button class={!this.showContactInfo ? 'active': ''} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                    <button class={this.showContactInfo ? 'active': ''} onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        )
    }
}