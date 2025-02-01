// Step 1: Global state
const state = {
  count: 0,
  message: "Welcome to the game",
  words: ["Hello", "World", "Yes", "Sir"],
  wordsBefore: [],
  wordsAfter: [],
};

// Step 2: Subscription system
const listeners = [];

export function subscribe(listener) {
  listeners.push(listener);
}

export function setState(newState) {
  Object.assign(state, newState);
  listeners.forEach((listener) => listener(state));
}

export function getState() {
  return state;
}
