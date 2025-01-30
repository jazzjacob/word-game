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
  console.log(listeners);
}

// Step 5: Function to get the current state
function getState() {
  return state;
}

// Step 6: Render function
function render() {
  document.getElementById('app').textContent = `Count: ${state.count}`;
}

// Step 7: Example usage
document.addEventListener('DOMContentLoaded', () => {
  const app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);

  const incrementButton = document.createElement('button');
  incrementButton.textContent = 'Increment';
  incrementButton.onclick = () => setState({ count: state.count + 1 });

  document.body.appendChild(incrementButton);

  // Subscribe to state changes
  subscribe(render);
  console.log(listeners);

  // Initial render
  render();
});
