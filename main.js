import { GuessedWordsList } from "./GuessedWordsList.js";

// Step 1: State object
const state = {
  count: 0, // Initial state
};

// Step 2: Subscriptions (callbacks to notify when state changes)
const listeners = [];

// Step 3: Function to subscribe to state changes
function subscribe(listener) {
  listeners.push(listener);
}

// Step 4: Function to update state and notify listeners
function setState(newState) {
  Object.assign(state, newState); // Merge new state with current state
  listeners.forEach((listener) => listener(state)); // Notify all listeners
}

// Step 5: Function to get the current state
function getState() {
  return state;
}

// ✅ Fix: Move render logic inside MainElement to work with shadow DOM
class MainElement extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM
    this.shadow = this.attachShadow({ mode: "open" });

    // Create template
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        p {
          color: red;
          font-size: 18px;
        }
      </style>
      <p>This is the main. Count: <span id="myCounter"></span></p>
      <button id="incrementBtn">Increment</button>
      <slot></slot>
    `;

    // Append template to shadow DOM
    this.shadow.append(template.content.cloneNode(true));

    // Get references to elements inside shadow DOM
    this.counterElement = this.shadow.getElementById("myCounter");
    this.incrementButton = this.shadow.getElementById("incrementBtn");

    // Subscribe to state updates
    subscribe(() => this.render());

    // Set up button click event inside the shadow DOM
    this.incrementButton.addEventListener("click", () => {
      setState({ count: state.count + 1 });
    });
  }

  // Render function now works inside shadow DOM
  render() {
    this.counterElement.textContent = state.count;
  }

  connectedCallback() {
    this.render(); // Initial render
  }
}

// Register the custom element
customElements.define("main-element", MainElement);
