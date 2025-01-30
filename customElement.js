const template = document.createElement("template");
template.innerHTML = `
  <style>
    p {
      color: dodgerblue;
    }
  </style>
  <p>
    <slot></slot>
  </p>
  <input type="checkbox" />
`;

// Create a class for the element
class MyCustomElement extends HTMLElement {

  constructor() {
    // Always call super first in constructor
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    // this.innerHTML = "Hello! I am the custom element.";
    this.checkbox = shadow.querySelector("input");
  }

  static get observedAttributes() {
    return ["checked"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "checked") this.updateChecked(newValue);
    console.log(name, oldValue, newValue);
  }

  updateChecked(value) {
    this.checkbox.checked = value != null && value !== "false";
  }

  /*
  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }
  */
}

customElements.define("my-custom-element", MyCustomElement);
