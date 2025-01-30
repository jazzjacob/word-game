import { getState, subscribe } from './state.js';

class GuessedWordsList extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        p {
          color: coral;
        }
      </style>
      <p>This is the Guessed Words List</p>
      <div id="dataFromState"></div>
      <ul id="wordList"></ul>
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));

    // ✅ FIX: Now we get the element AFTER appending the template
    this.dataElement = shadow.getElementById("dataFromState");
    this.wordList = shadow.getElementById("wordList");
  }

  render() {
    this.dataElement.textContent = getState().message || "No message yet!";

    let wordArray = getState().wordsBefore;

    if (wordArray) {
      console.log("Cleaning up innerHTML of wordlist here");
      console.log(wordArray);
      this.wordList.innerHTML = '';
      wordArray.forEach((word) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = word;
        this.wordList.appendChild(listItem);
      });
    }
    console.log(wordArray);
  }

  connectedCallback() {
    this.render(); // Initial render

    // ✅ FIX: Subscribe to state updates
    subscribe(() => this.render());
  }
}

customElements.define("guessed-words-list", GuessedWordsList);
export { GuessedWordsList };
