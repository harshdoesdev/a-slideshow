import './a-slide.js';

const template = document.createElement("template");

template.innerHTML = `
    <style>
    :host {
        display: flex;
        position: relative;
    }

    .nav-btns {
        position: absolute;
        display: flex;
        gap: 1rem;
        bottom: 5%;
        right: 5%;
    }
    
    .nav-btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: #f8f8ff;
        border-radius: .25rem;
        width: 2.5rem;
        height: 2.5rem;
        border: none;
        cursor: pointer;
    }
    
    .nav-btn:active {
        background: #eee;
    }

    .nav-btn:focus {
        outline-color: rgb(138, 43, 226);
    }
    
    .nav-btn:disabled {
        color: #999
    }
    
    .nav-btn svg {
        fill: currentColor;
    }
    
    .slides {
        flex: 1;
        display: flex;
        overflow: hidden;
        scroll-behavior: smooth;
    }
    </style>
    <div class="slides">
        <slot>Slides</slot>
    </div>
    <div class="nav-btns">
        <button class="nav-btn" id="prev">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/>
            </svg>
        </button>
        <button class="nav-btn" id="next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
            </svg>
        </button>
    </div>
`;

class Slideshow extends HTMLElement {

    _width = null
    _height = null

    static get observedAttributes() {
        return ["width", "height", "slide"];
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    set width(value) {
        this._width = value;
        this.style.width = this.width;
    }

    set height(value) {
        this._height = value;
        this.style.height = this.height;
    }

    get slide() {
        return parseInt(this.getAttribute("slide"));
    }

    set slide(value) {
        if(this.slide === value) {
            return;
        }
        
        this.slideIn(value);
    }

    slideIn(value) {
        if(!this.slides || value >= this.slides.length || value < 0) {
            return;
        }

        const slide = this.slides[value];
        
        slide.scrollIntoView();
        
        if(value >= this.slides.length - 1) {
            this.nextBtn.disabled = true;
        } else if(value >= 0) {
            this.nextBtn.disabled = false;
        }
        
        if(value === 0) {
            this.prevBtn.disabled = true;
        } else if(value <= this.slides.length - 1) {
            this.prevBtn.disabled = false;
        }

        this.setAttribute("slide", value);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.nextBtn = this.shadowRoot.querySelector("#next");
        this.prevBtn = this.shadowRoot.querySelector("#prev");

        const slot = this.shadowRoot.querySelector("slot");

        slot.addEventListener("slotchange", e => {
            this.slides = e.target.assignedElements();
            this.slideIn(this.slide || 0);
        });
    }

    connectedCallback() {
        this.nextBtn.addEventListener("click", () => this.navigate(1));
        this.prevBtn.addEventListener("click", () => this.navigate(-1));

        const keyDownListener = e => {
            const { key } = e;
            const isPrev = (key === "ArrowLeft");
            const isNext = (key === "ArrowRight" || key === " ");

            if(isNext || isPrev) {
                e.preventDefault();
                this.navigate(isNext ? 1 : -1);
            }
        };

        window.addEventListener("keydown", keyDownListener);
    }

    navigate(i) {
        this.slide += i;
    }

    attributeChangedCallback(attributeName, prevValue, newValue) {
        switch(attributeName) {
            case "width":
                this.width = newValue;
            break;
            case "height":
                this.height = newValue;
            case "slide":
                this.slide = parseInt(newValue);
        }
    }

}

customElements.define("a-slideshow", Slideshow);