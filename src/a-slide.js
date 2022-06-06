const template = document.createElement("template");

template.innerHTML = `
    <style>
    :host {
        flex: 0 0 100%;
    }
    .slide {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
    }
    </style>
    <div class="slide">
        <slot></slot>
    </div>
`;

class Slide extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

}

customElements.define("a-slide", Slide);