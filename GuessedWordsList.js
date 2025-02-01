import { getState, subscribe } from './state.js';

class GuessedWordsList extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    this.placement = this.getAttribute("placement");
    console.log("Placement = ", this.placement);

    template.innerHTML = `
      <style>
        p {
          color: coral;
        }
      </style>
      <p>Words ${this.placement == "before" ? `before` : `after`}</p>
      <ul id="wordList"></ul>
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    // ✅ FIX: Now we get the element AFTER appending the template
    this.wordList = shadow.getElementById("wordList");
  }

  renderWords() {
    console.log("placement: ", this.placement);
    let wordArray = this.placement == "before" ? getState().wordsBefore : getState().wordsAfter;
    console.log("wordArray: ", wordArray);

    if (wordArray) {
      this.wordList.innerHTML = '';
      wordArray.forEach((word) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = word;
        this.wordList.appendChild(listItem);
      });
    }
  }

  connectedCallback() {
    this.renderWords();
    subscribe(() => this.renderWords());
  }
}

customElements.define("guessed-words-list", GuessedWordsList);
export { GuessedWordsList };
