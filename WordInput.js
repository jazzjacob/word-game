import { lookUpWord } from "./app.js";

class WordInput extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        form {
          color: dodgerblue;
          background-color: gold;
          padding: 1rem;
        }
      </style>
      <form id="word-form">
        <input id="word" type="text"/>
        <button id="button" type="submit">Look up</button>
      </form>
    `;

    // Attach shadow DOM and append the template
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    this.button = shadow.getElementById("button");
  }

  connectedCallback() {
    const button = this.shadowRoot.getElementById("button");
    const input = this.shadowRoot.getElementById("word");

    button.addEventListener("click", (event) => {
      event.preventDefault();
      lookUpWord(input.value);
      console.log("Hello, world!"); // Prints to the console
      input.value = '';
    });
  }
}

customElements.define("word-input", WordInput);
